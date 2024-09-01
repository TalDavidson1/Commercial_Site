from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List, Optional
from .config import DATABASE_URL, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, STRIPE_API_KEY
import shutil
import os
from uuid import uuid4
import stripe

stripe.api_key = STRIPE_API_KEY

UPLOAD_DIRECTORY = "uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://teal-dasik-c24bc4.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    stripe_customer_id = Column(String, unique=True, nullable=True)

    properties = relationship("Property", back_populates="owner")
    subscriptions = relationship("Subscription", back_populates="user")
    favorites = relationship("Favorite", back_populates="user")
    alerts = relationship("Alert", back_populates="user")

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    square_footage = Column(Float)
    power_type = Column(String)
    hvac = Column(String)
    heat_type = Column(String)
    is_for_sale = Column(Boolean)
    is_for_lease = Column(Boolean)
    is_for_auction = Column(Boolean, default=False)  # New field for auction properties with default value
    property_type = Column(String, default="commercial")  # New field for property type with default value
    owner_id = Column(Integer, ForeignKey("users.id"))
    photo_url = Column(String)  # Field for storing the URL of the uploaded photo

    owner = relationship("User", back_populates="properties")
    favorites = relationship("Favorite", back_populates="property")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stripe_subscription_id = Column(String, unique=True)
    status = Column(String)
    current_period_end = Column(DateTime)

    user = relationship("User", back_populates="subscriptions")

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    property_id = Column(Integer, ForeignKey("properties.id"))

    user = relationship("User", back_populates="favorites")
    property = relationship("Property", back_populates="favorites")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    criteria = Column(String)  # JSON string containing alert criteria
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="alerts")

# Pydantic models
class UserCreate(BaseModel):
    email: str
    password: str

class UserInDB(BaseModel):
    id: int
    email: str
    is_active: bool
    stripe_customer_id: Optional[str] = None

    class Config:
        orm_mode = True

class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    square_footage: float
    power_type: str
    hvac: str
    heat_type: str
    is_for_sale: bool
    is_for_lease: bool
    is_for_auction: Optional[bool] = False
    photo_url: Optional[str] = None
    property_type: Optional[str] = "commercial"

class PropertyInDB(BaseModel):
    id: int
    title: str
    description: str
    price: float
    square_footage: float
    power_type: str
    hvac: str
    heat_type: str
    is_for_sale: bool
    is_for_lease: bool
    is_for_auction: Optional[bool] = None
    owner_id: int
    photo_url: Optional[str] = None
    property_type: Optional[str] = None

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class SubscriptionCreate(BaseModel):
    plan_id: str

class SubscriptionInDB(BaseModel):
    id: int
    user_id: int
    stripe_subscription_id: str
    status: str
    current_period_end: datetime

    class Config:
        orm_mode = True

class CardUpdate(BaseModel):
    token: str

class FavoriteCreate(BaseModel):
    property_id: int

class FavoriteInDB(BaseModel):
    id: int
    user_id: int
    property_id: int

    class Config:
        orm_mode = True

class AlertCreate(BaseModel):
    criteria: str

class AlertInDB(BaseModel):
    id: int
    user_id: int
    criteria: str

    class Config:
        orm_mode = True

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: SessionLocal = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# User registration and authentication
@app.post("/users", response_model=UserInDB)
async def create_user(user: UserCreate, db: SessionLocal = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: SessionLocal = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Property listings API
@app.post("/properties", response_model=PropertyInDB)
async def create_property(property: PropertyCreate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    # Note: The access token is automatically handled by the get_current_user dependency
    # The token should be included in the Authorization header as: Bearer <access_token>
    new_property = Property(**property.dict(), owner_id=current_user.id)
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property

@app.get("/properties", response_model=List[PropertyInDB])
async def get_properties(
    skip: int = 0,
    limit: int = 100,
    is_for_sale: Optional[bool] = None,
    is_for_lease: Optional[bool] = None,
    is_for_auction: Optional[bool] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_square_footage: Optional[float] = None,
    max_square_footage: Optional[float] = None,
    property_type: Optional[str] = None,
    db: SessionLocal = Depends(get_db)
):
    query = db.query(Property)

    if is_for_sale is not None:
        query = query.filter(Property.is_for_sale == is_for_sale)
    if is_for_lease is not None:
        query = query.filter(Property.is_for_lease == is_for_lease)
    if is_for_auction is not None:
        query = query.filter(Property.is_for_auction.isnot(None))
        query = query.filter(Property.is_for_auction == is_for_auction)
    if min_price is not None:
        query = query.filter(Property.price >= min_price)
    if max_price is not None:
        query = query.filter(Property.price <= max_price)
    if min_square_footage is not None:
        query = query.filter(Property.square_footage >= min_square_footage)
    if max_square_footage is not None:
        query = query.filter(Property.square_footage <= max_square_footage)
    if property_type is not None:
        query = query.filter(Property.property_type == property_type)

    properties = query.offset(skip).limit(limit).all()
    return properties

@app.put("/properties/{property_id}", response_model=PropertyInDB)
async def update_property(
    property_id: int,
    property_update: PropertyCreate,
    current_user: User = Depends(get_current_user),
    db: SessionLocal = Depends(get_db)
):
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    if db_property.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this property")

    for key, value in property_update.dict().items():
        setattr(db_property, key, value)

    db.commit()
    db.refresh(db_property)
    return db_property

@app.delete("/properties/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_property(
    property_id: int,
    current_user: User = Depends(get_current_user),
    db: SessionLocal = Depends(get_db)
):
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    if db_property.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this property")

    db.delete(db_property)
    db.commit()
    return {"message": "Property deleted successfully"}

@app.post("/properties/{property_id}/upload-photo", response_model=PropertyInDB)
async def upload_photo(
    property_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: SessionLocal = Depends(get_db)
):
    db_property = db.query(Property).filter(Property.id == property_id).first()
    if db_property is None:
        raise HTTPException(status_code=404, detail="Property not found")
    if db_property.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to upload photo for this property")

    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    db_property.photo_url = file_location
    db.commit()
    db.refresh(db_property)
    return db_property

# Subscription and payment management API
@app.post("/subscriptions", response_model=SubscriptionInDB)
async def create_subscription(subscription: SubscriptionCreate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    try:
        # Create a Stripe customer if not exists
        if not current_user.stripe_customer_id:
            stripe_customer = stripe.Customer.create(email=current_user.email)
            current_user.stripe_customer_id = stripe_customer.id
            db.commit()

        # Create Stripe subscription
        stripe_subscription = stripe.Subscription.create(
            customer=current_user.stripe_customer_id,
            items=[{"price": subscription.price_id}],
        )

        # Create subscription in database
        db_subscription = Subscription(
            user_id=current_user.id,
            stripe_subscription_id=stripe_subscription.id,
            status=stripe_subscription.status,
            current_period_end=datetime.fromtimestamp(stripe_subscription.current_period_end)
        )
        db.add(db_subscription)
        db.commit()
        db.refresh(db_subscription)
        return db_subscription
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/subscriptions/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_subscription(subscription_id: int, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_subscription = db.query(Subscription).filter(Subscription.id == subscription_id, Subscription.user_id == current_user.id).first()
    if not db_subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")

    try:
        stripe.Subscription.delete(db_subscription.stripe_subscription_id)
        db.delete(db_subscription)
        db.commit()
        return {"message": "Subscription canceled successfully"}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/users/update-card", response_model=UserInDB)
async def update_card(card: CardUpdate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    if not current_user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No Stripe customer found for this user")

    try:
        # Create a new card token
        token = stripe.Token.create(
            card={
                "number": card.card_number,
                "exp_month": card.exp_month,
                "exp_year": card.exp_year,
                "cvc": card.cvc,
            },
        )

        # Update the customer's default source
        stripe.Customer.modify(
            current_user.stripe_customer_id,
            source=token.id,
        )

        return current_user
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Favorites management
@app.post("/favorites", response_model=FavoriteInDB)
async def add_favorite(favorite: FavoriteCreate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_favorite = Favorite(user_id=current_user.id, property_id=favorite.property_id)
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return db_favorite

@app.delete("/favorites/{favorite_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_favorite(favorite_id: int, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_favorite = db.query(Favorite).filter(Favorite.id == favorite_id, Favorite.user_id == current_user.id).first()
    if db_favorite is None:
        raise HTTPException(status_code=404, detail="Favorite not found")
    db.delete(db_favorite)
    db.commit()
    return {"message": "Favorite removed successfully"}

@app.get("/favorites", response_model=List[FavoriteInDB])
async def list_favorites(current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    favorites = db.query(Favorite).filter(Favorite.user_id == current_user.id).all()
    return favorites

# Alerts management
@app.post("/alerts", response_model=AlertInDB)
async def create_alert(alert: AlertCreate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_alert = Alert(user_id=current_user.id, criteria=alert.criteria)
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

@app.put("/alerts/{alert_id}", response_model=AlertInDB)
async def update_alert(alert_id: int, alert: AlertCreate, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_alert = db.query(Alert).filter(Alert.id == alert_id, Alert.user_id == current_user.id).first()
    if db_alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    db_alert.criteria = alert.criteria
    db.commit()
    db.refresh(db_alert)
    return db_alert

@app.delete("/alerts/{alert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_alert(alert_id: int, current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    db_alert = db.query(Alert).filter(Alert.id == alert_id, Alert.user_id == current_user.id).first()
    if db_alert is None:
        raise HTTPException(status_code=404, detail="Alert not found")
    db.delete(db_alert)
    db.commit()
    return {"message": "Alert deleted successfully"}

@app.get("/alerts", response_model=List[AlertInDB])
async def list_alerts(current_user: User = Depends(get_current_user), db: SessionLocal = Depends(get_db)):
    alerts = db.query(Alert).filter(Alert.user_id == current_user.id).all()
    return alerts

# Create tables
Base.metadata.create_all(bind=engine)

# PropNet - Commercial Real Estate Platform

## Project Overview
PropNet is a modern commercial real estate platform inspired by industry leaders like Zillow and Crexi. It offers a comprehensive solution for users to search, list, and manage commercial properties, with a focus on user experience and powerful features for both buyers and sellers. The platform is designed to cater to the needs of commercial real estate professionals, investors, and businesses looking for their next property.

## Features
- User authentication and authorization system using OAuth2 with password flow
- Property listing and advanced search functionality with filtering options
- Subscription and payment management via Stripe integration
- Favorites and alerts system for personalized user experience
- Responsive design for seamless desktop and mobile usage
- Crexi-inspired UI with a modern, professional aesthetic
- User dashboard for managing listings, favorites, and account settings

## Tech Stack
- Backend: FastAPI with PostgreSQL database
- Frontend: React with Chakra UI for component styling
- Authentication: JWT (JSON Web Tokens)
- Payment Processing: Stripe integration
- ORM: SQLAlchemy
- API Documentation: Swagger UI
- Database Migrations: Alembic

## Recent Updates
- Merged `implement-payment-methods` branch into `backend-setup`
- Implemented Crexi-inspired design changes across the platform
- Added responsive header with navigation menu for improved mobile experience
- Created comprehensive user dashboard for managing listings, favorites, and subscriptions
- Enhanced property listing cards with grid layout and improved visual design
- Integrated advanced search functionality with multiple filtering options
- Updated color scheme and typography for improved visual appeal and brand consistency
- Implemented Stripe integration for subscription management

## Setup and Installation

### Backend Setup
1. Clone the repository: `git clone https://github.com/your-repo/propnet.git`
2. Navigate to the backend directory: `cd propnet/commercial_real_estate_backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Set up environment variables:
   - Create a `.env` file in the `commercial_real_estate_backend` directory
   - Add the following variables:
     ```
     DATABASE_URL=postgresql://user:password@localhost/propnet
     SECRET_KEY=your_secret_key_here
     STRIPE_API_KEY=your_stripe_api_key_here
     ```
7. Run migrations: `alembic upgrade head`
8. Start the backend server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Navigate to the frontend directory: `cd propnet/frontend`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory
   - Add the following variable:
     ```
     REACT_APP_API_BASE_URL=http://localhost:8000
     ```
4. Start the development server: `npm start`

## API Documentation
API documentation is available at `http://localhost:8000/docs` when running the backend server locally. This interactive documentation allows you to explore and test all available endpoints.

## Current Development Status
- User authentication and property listing features are fully implemented
- Stripe integration for subscription management is in place
- Frontend design has been updated to match Crexi's aesthetic
- User dashboard is functional but may require further enhancements

## Known Issues
- Auction functionality is not yet implemented
- Some advanced filtering options in the search feature may need refinement
- Performance optimizations for large datasets are pending

## Contributing
We welcome contributions to PropNet! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Next Steps
1. Implement data analytics and insights feature for property market trends
2. Enhance user portal with more detailed property management tools
3. Develop auction functionality for properties
4. Integrate more comprehensive testing, including end-to-end tests
5. Optimize performance and scalability for handling larger volumes of listings
6. Implement advanced search algorithms for more accurate property matching

For a detailed roadmap and current issues, please check our [GitHub Issues](https://github.com/your-repo/propnet/issues) page.

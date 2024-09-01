# PropNet - Commercial Real Estate Platform

## Project Overview
PropNet is a modern commercial real estate platform inspired by industry leaders like Zillow and Crexi. It offers a comprehensive solution for users to search, list, and manage commercial properties, with a focus on user experience and powerful features for both buyers and sellers.

## Features
- User authentication and authorization system
- Property listing and advanced search functionality
- Subscription and payment management via Stripe integration
- Favorites and alerts system for personalized user experience
- Responsive design for seamless desktop and mobile usage
- Crexi-inspired UI with a modern, professional aesthetic

## Tech Stack
- Backend: FastAPI with PostgreSQL database
- Frontend: React with Chakra UI for component styling
- Authentication: JWT (JSON Web Tokens)
- Payment Processing: Stripe integration
- ORM: SQLAlchemy
- API Documentation: Swagger UI

## Recent Updates
- Implemented Crexi-inspired design changes
- Added responsive header with navigation menu
- Created user dashboard for managing listings and favorites
- Enhanced property listing cards with grid layout
- Integrated advanced search functionality
- Updated color scheme and typography for improved visual appeal

## Setup and Installation

### Backend Setup
1. Clone the repository: `git clone https://github.com/your-repo/propnet.git`
2. Navigate to the backend directory: `cd propnet/commercial_real_estate_backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Set up environment variables (database URL, Stripe API key, etc.)
7. Run migrations: `alembic upgrade head`
8. Start the backend server: `uvicorn app.main:app --reload`

### Frontend Setup
1. Navigate to the frontend directory: `cd propnet/frontend`
2. Install dependencies: `npm install`
3. Set up environment variables (API base URL, etc.)
4. Start the development server: `npm start`

## API Documentation
API documentation is available at `http://localhost:8000/docs` when running the backend server locally.

## Contributing
We welcome contributions to PropNet! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Next Steps
1. Implement data analytics and insights feature
2. Enhance user portal for property management
3. Develop auction functionality for properties
4. Integrate more comprehensive testing
5. Optimize performance and scalability

For a detailed roadmap and current issues, please check our [GitHub Issues](https://github.com/your-repo/propnet/issues) page.

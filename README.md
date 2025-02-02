# PropNet - Commercial Real Estate Platform

## Project Overview
PropNet is a modern commercial real estate platform inspired by industry leaders like Zillow and Crexi. It offers a comprehensive solution for users to search, list, and manage commercial properties, with a focus on user experience and powerful features for both buyers and sellers. The platform is designed to cater to the needs of commercial real estate professionals, investors, and businesses looking for their next property.

## Features
- User authentication and authorization system using OAuth2 with password flow
- Property listing and advanced search functionality with filtering options
- Interactive map view for property locations
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
- Mapping: react-leaflet

## Recent Updates
- Implemented interactive map feature using react-leaflet for property visualization
- Completed design alignment with Crexi's aesthetic across the platform
- Updated color scheme:
  - Primary blue: #0061DF
  - Secondary colors: Green #34C759, Red #FF3B30
  - Refined gray scale for improved contrast and readability
- Typography enhancements:
  - Adopted Inter font family for both headings and body text
- Improved responsive header with navigation menu for better mobile experience
- Enhanced property listing cards with grid layout and updated visual design
- Integrated advanced search functionality with multiple filtering options
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
- Interactive map view for property locations is now available
- Stripe integration for subscription management is in place
- Frontend design has been fully updated to match Crexi's aesthetic
- User dashboard is functional with improved layout and styling
- Advanced search functionality with multiple filters is operational

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
7. Enhance map functionality with clustering for better performance with large datasets

For a detailed roadmap and current issues, please check our [GitHub Issues](https://github.com/your-repo/propnet/issues) page.

## Implementation Plan for Zillow-like Map and Search Functionality

To create a Zillow-like experience in PropNet, we will focus on implementing an interactive map and robust search functionality. Here's our plan:

1. Map Integration:
   - Use react-leaflet for an interactive map component
   - Implement property markers on the map
   - Add clustering for better performance with large datasets
   - Include zoom controls and various map view options (satellite, street view)

2. Search Functionality:
   - Create a prominent search bar for entering location (address, neighborhood, city, or ZIP)
   - Implement autocomplete for search suggestions
   - Add advanced filtering options:
     - Property type (office, retail, industrial, etc.)
     - Price range
     - Square footage
     - Number of units
     - Year built
     - Amenities

3. User Interface:
   - Design a layout with the map on one side and property listings on the other
   - Implement responsive design for mobile and desktop views
   - Create property cards with key information:
     - Price
     - Property type
     - Square footage
     - Address
     - Thumbnail image

4. Interaction Features:
   - Enable clicking on map markers to show property details
   - Implement save/favorite functionality for properties
   - Add a drawing tool for custom area search

5. Performance Optimization:
   - Implement lazy loading for property listings
   - Use efficient data structures for quick filtering and sorting
   - Optimize API calls to reduce load times

6. Additional Enhancements:
   - Implement geolocation for "Properties near me" feature
   - Add street view integration for selected properties
   - Create a "Recently viewed" section for user convenience

This plan will be implemented incrementally, with regular testing and user feedback incorporated throughout the development process.

## File Structure and Explanations

Here's an overview of the main files and directories in the PropNet repository:

### Backend (/commercial_real_estate_backend)

- `main.py`: Entry point of the FastAPI application, sets up the API routes and middleware.
- `models.py`: Defines SQLAlchemy ORM models for database tables.
- `schemas.py`: Pydantic schemas for request/response data validation.
- `crud.py`: Contains CRUD operations for interacting with the database.
- `database.py`: Establishes database connection and session management.
- `auth.py`: Implements authentication and authorization logic.
- `routers/`: Directory containing API route handlers for different resources.
  - `properties.py`: Handles property-related API endpoints.
  - `users.py`: Manages user-related API endpoints.
  - `subscriptions.py`: Handles subscription and payment-related endpoints.

### Frontend (/frontend)

- `src/`: Main source directory for React components and logic.
  - `components/`: Reusable React components.
    - `Map.js`: Implements an interactive map using react-leaflet, crucial for the Zillow-like experience. It displays property locations with markers and uses clustering for better performance with large datasets. The map component is responsive to search results and allows users to explore properties visually.
    - `SearchBar.js`: Provides advanced search functionality with a user-friendly interface. It includes a main search input for location (address, neighborhood, city, or ZIP) and collapsible advanced filters for price range, square footage, and property type. This component enhances the user's ability to find specific properties quickly.
    - `PropertyList.js`: Renders a list of property cards based on search results or default listings. It handles the display of property information in a grid layout, optimized for both desktop and mobile views. This component works in tandem with the Map to provide a comprehensive property browsing experience.
    - `PropertyCard.js`: Displays individual property information in a concise, visually appealing format. It shows key details such as price, square footage, and property type, with a thumbnail image to give users a quick overview of each listing.
  - `pages/`: React components for different pages/routes.
    - `Home.js`: The main landing page that integrates Map, SearchBar, and PropertyList components. It implements a Zillow-like layout with the search bar and property list on one side (30% width) and the interactive map on the other (70% width). This component manages the state of search results and coordinates the interaction between search inputs and map display.
    - `PropertyDetails.js`: Provides a detailed view of a single property, including extended information, multiple images, and potentially virtual tour options.
    - `UserDashboard.js`: A personalized dashboard for users to manage their saved properties, search history, and account settings.
  - `services/`: API service functions for backend communication, handling data fetching and state management.
  - `utils/`: Utility functions and helpers for common tasks across the application.
  - `App.js`: Main React component that sets up routing and global state management.
  - `index.js`: Entry point of the React application, responsible for rendering the App component and setting up any necessary providers.

- `public/`: Contains static assets and the HTML template for the React application.

### Configuration Files

- `.env`: Environment variables for both backend and frontend (not tracked in git).
- `requirements.txt`: Python dependencies for the backend.
- `package.json`: Node.js dependencies and scripts for the frontend.
- `alembic.ini`: Configuration for Alembic database migrations.

This structure organizes the codebase into logical components, separating backend and frontend concerns while maintaining a clear hierarchy for easy navigation and maintenance. The integration of Map, SearchBar, PropertyList, and Home components creates a cohesive, Zillow-like user experience, allowing users to search, view, and interact with property listings efficiently.

## Recent Updates

### Hover Functionality
- Implemented hover effects for both map pins and property listings
- Property cards in the list highlight when the corresponding map pin is hovered over
- Map pins change color when the corresponding property card is hovered over
- This bidirectional hover functionality enhances user interaction and property identification

### Map Improvements
- Improved map centering and pin accuracy for better property location representation
- Sample address (805 Pine Street, Mooresville, NC 28115) now correctly centered on the map
- Adjusted zoom level for optimal visibility of property pins
- Enhanced pin placement accuracy for all listed properties

### Known Limitations
- Currently, only one pin may be visible on the map despite multiple property listings
- This is a temporary limitation that will be addressed in future updates

These updates significantly improve the user experience by providing more accurate property locations and enhancing the visual connection between the property list and map view.

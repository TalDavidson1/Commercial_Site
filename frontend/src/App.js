import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import axios from 'axios';

// Import components
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';

// Set up Axios base URL
axios.defaults.baseURL = 'http://0.0.0.0:8000'; // Updated to the actual backend URL

// Define custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F0FF',
      100: '#B8D5FF',
      200: '#8ABAFF',
      300: '#5C9FFF',
      400: '#2E84FF',
      500: '#0069FF',
      600: '#0054CC',
      700: '#003F99',
      800: '#002A66',
      900: '#001533',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Open Sans", sans-serif',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<PropertyList />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;

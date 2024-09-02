import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import axios from 'axios';

// Import components
import Header from './components/Header';
import Home from './pages/Home';
import PropertyDetail from './components/PropertyDetail';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Set up Axios base URL
axios.defaults.baseURL = 'http://0.0.0.0:8000'; // Updated to the actual backend URL

// Define custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F0FF',
      100: '#CCE0FF',
      200: '#99C1FF',
      300: '#66A3FF',
      400: '#3384FF',
      500: '#0061DF', // Crexi's primary blue
      600: '#004EC2',
      700: '#003A94',
      800: '#002766',
      900: '#001438',
    },
    secondary: {
      green: '#34C759', // Adjusted to a more vibrant green
      red: '#FF3B30',   // Adjusted to a brighter red
    },
    gray: {
      100: '#F7F8FA',
      200: '#E5E8ED',
      300: '#D3D8E0',
      400: '#C1C7D3',
      500: '#A0A8B5',
      600: '#808997',
      700: '#606A7A',
      800: '#404B5C',
      900: '#202C3E',
    },
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <Header />
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;

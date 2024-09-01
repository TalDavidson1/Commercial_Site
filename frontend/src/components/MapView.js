import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = ({ properties }) => {
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]); // Center of US
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Center map on the first property
      setMapCenter([properties[0].latitude, properties[0].longitude]);
      setZoom(10);
    }
  }, [properties]);

  return (
    <Box height="600px" width="100%">
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties && properties.map((property) => (
          <Marker key={property.id} position={[property.latitude, property.longitude]}>
            <Popup>
              <div>
                <h3>{property.title}</h3>
                <p>${property.price.toLocaleString()}</p>
                <p>{property.square_footage.toLocaleString()} sq ft</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = ({ properties }) => {
  const [center, setCenter] = useState([40.7128, -74.0060]); // Default to New York City
  const [zoom, setZoom] = useState(13);

  const MapControls = () => {
    const map = useMap();
    useEffect(() => {
      map.zoomControl.setPosition('topright');
    }, [map]);
    return null;
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {properties.map((property) => (
          <Marker key={property.id} position={[property.latitude, property.longitude]}>
            <Popup>
              <div>
                <h3>{property.title}</h3>
                <p>{property.address}</p>
                <p>Price: ${property.price.toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MapControls />
    </MapContainer>
  );
};

export default Map;

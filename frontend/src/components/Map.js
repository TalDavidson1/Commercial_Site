import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = React.memo(({ properties, center = [40.7128, -74.0060], zoom = 13, hoveredPropertyId, onMarkerMouseEnter, onMarkerMouseLeave }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerClusterGroupRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    mapInstanceRef.current.zoomControl.setPosition('topright');

    markerClusterGroupRef.current = L.markerClusterGroup().addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (markerClusterGroupRef.current) {
        markerClusterGroupRef.current.clearLayers();
        markerClusterGroupRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (!markerClusterGroupRef.current) return;

    markerClusterGroupRef.current.clearLayers();
    markersRef.current = {};

    properties.forEach((property) => {
      if (property && property.latitude && property.longitude) {
        const marker = L.marker([property.latitude, property.longitude]);
        marker.bindPopup(`
          <div>
            <h3>${property.title}</h3>
            <p>${property.address}</p>
            <p>Price: $${property.price ? property.price.toLocaleString() : 'N/A'}</p>
          </div>
        `);
        marker.on('mouseover', () => onMarkerMouseEnter(property.id));
        marker.on('mouseout', () => onMarkerMouseLeave(property.id));
        markerClusterGroupRef.current.addLayer(marker);
        markersRef.current[property.id] = marker;
      }
    });
  }, [properties, onMarkerMouseEnter, onMarkerMouseLeave]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (id === hoveredPropertyId) {
        marker.setIcon(L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        }));
      } else {
        marker.setIcon(new L.Icon.Default());
      }
    });
  }, [hoveredPropertyId]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
});

export default Map;

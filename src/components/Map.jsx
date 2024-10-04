import React, { useRef } from 'react'
import '../component-styles/map.scss'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import locationMarkerIcon from '../assets/icon-location.svg';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// replace default marker icon with custom icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: locationMarkerIcon,
  iconUrl: locationMarkerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [1, -34]
});


function Map() {
  const locationCenter = [51.505, -0.09];
  const defaultZoom = 14;
  const mapRef = useRef(null);

  // Reset to default center and zoom
  const resetMapView = () => {
    const map = mapRef.current;
    if (map) {
      map.setView(locationCenter, defaultZoom);
    }
  };
  
  return (
    <>
      <div id="map-wrapper">
        <button id='reset-btn' onClick={resetMapView}>
          Reset Map
        </button>

        <MapContainer id='map' ref={mapRef}
          center={locationCenter} 
          zoom={defaultZoom}  
          zoomControl={false} 
          doubleClickZoom={true}
          dragging={true} >

          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={[51.505, -0.09]} >
            <Popup>IP address location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default Map
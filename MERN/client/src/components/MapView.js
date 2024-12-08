import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchNearestBuses } from "../api";

const MapView = () => {
  const [buses, setBuses] = useState([]);
  const userLocation = { lat: 12.9716, lng: 77.5946 };

  const fetchBuses = async () => {
    try {
      const { data } = await fetchNearestBuses(userLocation.lat, userLocation.lng);
      setBuses(data.buses);
    } catch (error) {
      console.error("Error fetching nearest buses:", error);
    }
  };

  return (
    <div>
      <h2>Nearby Buses</h2>
      <button onClick={fetchBuses}>Find Buses</button>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={userLocation}
          zoom={12}
        >
          <Marker position={userLocation} label="You" />
          {buses.map((bus, index) => (
            <Marker
              key={index}
              position={{ lat: bus.latitude, lng: bus.longitude }}
              label={`Bus ${bus.id}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapView;
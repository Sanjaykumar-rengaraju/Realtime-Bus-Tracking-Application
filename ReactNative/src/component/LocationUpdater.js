import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

const LocationUpdater = () => {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        sendLocationToServer(latitude, longitude);
      },
      (error) => {
        Alert.alert("Error", "Failed to get location. Please try again.");
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      await axios.post("http://localhost:5000/api/buses/update", {
        id: "bus123", // Example bus ID
        latitude,
        longitude,
        destination: "Destination A",
      });
      Alert.alert("Success", "Location sent to server.");
    } catch (error) {
      console.error("Error sending location:", error);
      Alert.alert("Error", "Failed to send location to server.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Location Updates</Text>
      <Button title="Update Location" onPress={getLocation} />
      {location && (
        <Text style={styles.location}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  location: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default LocationUpdater;

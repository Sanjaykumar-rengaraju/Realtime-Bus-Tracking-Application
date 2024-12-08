import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LocationUpdater from "../components/LocationUpdater";
import TicketVerifier from "../components/TicketVerifier";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Driver/Conductor App</Text>
      <LocationUpdater />
      <TicketVerifier />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomeScreen;

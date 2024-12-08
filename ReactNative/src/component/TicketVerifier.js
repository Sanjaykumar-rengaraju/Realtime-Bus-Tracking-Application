import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const TicketVerifier = () => {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);

  const fetchTicketData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketId}`
      );
      setTicketData(response.data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      Alert.alert("Error", "Failed to fetch ticket data.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ticket Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChangeText={setTicketId}
      />
      <Button title="Verify Ticket" onPress={fetchTicketData} />
      {ticketData && (
        <View style={styles.ticketInfo}>
          <Text>Ticket ID: {ticketData._id}</Text>
          <Text>Amount: ₹{ticketData.amount}</Text>
          <Text>Status: {ticketData.isPaid ? "Paid" : "Not Paid"}</Text>
        </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  ticketInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default TicketVerifier;

import React, { useState } from "react";
import { generateTicket, updatePaymentStatus } from "../api";

const TicketPayment = () => {
  const [userId] = useState("user123"); 
  const [busId, setBusId] = useState("");
  const [amount, setAmount] = useState("");
  const [ticketId, setTicketId] = useState("");

  const createTicket = async () => {
    try {
      const { data } = await generateTicket(userId, busId, amount);
      setTicketId(data.ticketId);
      alert("Ticket created! Proceed to payment.");
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };

  const payTicket = async () => {
    try {
      await updatePaymentStatus(ticketId);
      alert("Payment successful!");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div>
      <h2>Ticket Payment</h2>
      <div>
        <label>Bus ID:</label>
        <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button onClick={createTicket}>Generate Ticket</button>
      {ticketId && <button onClick={payTicket}>Pay Now</button>}
    </div>
  );
};

export default TicketPayment;

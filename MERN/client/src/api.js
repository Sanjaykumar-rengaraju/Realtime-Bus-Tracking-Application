import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" }); 

export const fetchNearestBuses = (latitude, longitude) =>
  API.post("/buses/nearest", { latitude, longitude });

export const generateTicket = (userId, busId, amount) =>
  API.post("/tickets/generate", { userId, busId, amount });

export const updatePaymentStatus = (ticketId) =>
  API.post(`/tickets/pay/${ticketId}`);

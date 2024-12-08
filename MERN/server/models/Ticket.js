const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  userId: { type: String, required: true },
  busId: { type: String, required: true },
  amount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Ticket", ticketSchema);

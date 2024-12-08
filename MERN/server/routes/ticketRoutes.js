const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

// Generate a ticket
router.post("/generate", async (req, res) => {
  const { userId, busId, amount } = req.body;

  try {
    const ticket = new Ticket({ userId, busId, amount });
    await ticket.save();
    res.status(200).json({ ticketId: ticket._id, message: "Ticket generated" });
  } catch (error) {
    res.status(500).json({ message: "Error generating ticket", error });
  }
});

// Update payment status
router.post("/pay/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.isPaid = true;
    await ticket.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error });
  }
});

module.exports = router;

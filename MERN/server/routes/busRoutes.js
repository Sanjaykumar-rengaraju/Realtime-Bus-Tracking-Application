const express = require("express");
const Bus = require("../models/Bus");

const router = express.Router();

// Fetch nearest buses
router.post("/nearest", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const buses = await Bus.find();
    const sortedBuses = buses
      .map((bus) => {
        const distance = Math.sqrt(
          Math.pow(bus.latitude - latitude, 2) + Math.pow(bus.longitude - longitude, 2)
        );
        return { ...bus._doc, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);

    res.status(200).json({ buses: sortedBuses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses", error });
  }
});

// Add or update bus location
router.post("/update", async (req, res) => {
  const { id, latitude, longitude, destination } = req.body;

  try {
    let bus = await Bus.findOne({ id });
    if (bus) {
      bus.latitude = latitude;
      bus.longitude = longitude;
      bus.destination = destination;
    } else {
      bus = new Bus({ id, latitude, longitude, destination });
    }
    await bus.save();
    res.status(200).json({ message: "Bus location updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating bus location", error });
  }
});

module.exports = router;

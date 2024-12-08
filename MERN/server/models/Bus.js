const mongoose = require("mongoose");

const busSchema = mongoose.Schema({
  id: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  destination: { type: String, required: true },
});

module.exports = mongoose.model("Bus", busSchema);

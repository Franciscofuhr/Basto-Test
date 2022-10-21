const mongoose = require("mongoose");

const cowsSchema = new mongoose.Schema({
  idSENASA: { type: String, required: true, minlength: 16, maxlength: 16 },
  type: {
    type: String,
    enum: ["Novillo", "Toro", "Vaquillona"],
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  fieldName: {
    type: String,
    required: true,
    maxlength: 200,
  },
  device: {
    type: String,
    required: true,
    enum: ["Collar", "Caravana"],
  },
  deviceNumber: {
    type: String,
    required: true,
    maxlength: 8,
    minlength: 8,
  },
});

const Cow = mongoose.model("Cow", cowsSchema);
module.exports = { Cow };

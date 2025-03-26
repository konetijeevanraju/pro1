require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Define Schema
const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  checkin: String,
  checkout: String,
  guests: String,
  rooms: String,
  food: String
});

const Booking = mongoose.model('Booking', BookingSchema);

// API Endpoint to Save Booking
app.post('/book-hotel', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ success: true, message: "Booking saved in database!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));

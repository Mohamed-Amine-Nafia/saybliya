const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const CustomerSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  addressInfo: String,
  chosenService: String,
  done: { type: Boolean, default: false }
});
const Customer = mongoose.model("Customer", CustomerSchema);

// Add customer
app.post("/api/customers", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

// Get all customers
app.get("/api/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Delete customer
app.delete("/api/customers/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Update mission done status
app.patch("/api/customers/:id", async (req, res) => {
  const { done } = req.body;
  await Customer.findByIdAndUpdate(req.params.id, { done });
  res.sendStatus(200);
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));

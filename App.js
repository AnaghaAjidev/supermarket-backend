require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// ====================== Product Schema ======================

const Product = mongoose.model(
  "Products",
  new mongoose.Schema({
    product_id: String,
    product_name: String,
    category: String,
    brand: String,
    quantity: String,
    unit_price: String,
    manufacturing_date: String,
    expiry_date: String,
    supplier_name: String,
    product_image_url: String,
    stock_status: String,
    product_description: String,
  })
);

// ====================== Customer Schema ======================

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    customer_id: String,
    customer_name: String,
    gender: String,
    phone_number: String,
    email: String,
    address: String,
    city: String,
    state: String,
    membership_type: String,
    registration_date: String,
    total_purchase_amount: String,
    loyalty_points: String,
  })
);

// ====================== Offer Schema ======================

const Offer = mongoose.model(
  "Offers",
  new mongoose.Schema({
    offer_id: String,
    offer_name: String,
    offer_type: String,
    product_category: String,
    discount_percentage: String,
    minimum_purchase_amount: String,
    start_date: String,
    end_date: String,
    applicable_products: String,
    coupon_code: String,
    status: String,
    offer_description: String,
  })
);

// ====================== TEST ======================

app.get("/test", (req, res) => {
  res.send("Supermarket Backend Working");
});

// ====================== PRODUCT ======================

app.post("/add_product", async (req, res) => {
  try {
    await Product.create(req.body);

    res.json({
      status: "success",
      message: "Product Added",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/view_product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/delete_product", async (req, res) => {
  try {
    const { product_id } = req.body;

    await Product.findOneAndDelete({ product_id });

    res.json({
      status: "success",
      message: "Product Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/search_product", async (req, res) => {
  try {
    const searchText = req.body.search || "";

    const products = await Product.find({
      $or: [
        { product_name: { $regex: searchText, $options: "i" } },
        { category: { $regex: searchText, $options: "i" } },
        { brand: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/update_product", async (req, res) => {
  try {
    const { product_id, ...updateData } = req.body;

    await Product.findOneAndUpdate({ product_id }, updateData);

    res.json({
      status: "success",
      message: "Product Updated",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ====================== CUSTOMER ======================

app.post("/add_customer", async (req, res) => {
  try {
    await Customer.create(req.body);

    res.json({
      status: "success",
      message: "Customer Added",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/view_customer", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/delete_customer", async (req, res) => {
  try {
    const { customer_id } = req.body;

    await Customer.findOneAndDelete({ customer_id });

    res.json({
      status: "success",
      message: "Customer Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/search_customer", async (req, res) => {
  try {
    const searchText = req.body.search || "";

    const customers = await Customer.find({
      $or: [
        { customer_name: { $regex: searchText, $options: "i" } },
        { email: { $regex: searchText, $options: "i" } },
        { phone_number: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/update_customer", async (req, res) => {
  try {
    const { customer_id, ...updateData } = req.body;

    await Customer.findOneAndUpdate({ customer_id }, updateData);

    res.json({
      status: "success",
      message: "Customer Updated",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ====================== OFFER ======================

app.post("/add_offer", async (req, res) => {
  try {
    await Offer.create(req.body);

    res.json({
      status: "success",
      message: "Offer Added",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/view_offer", async (req, res) => {
  try {
    const offers = await Offer.find();

    res.json(offers);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/delete_offer", async (req, res) => {
  try {
    const { offer_id } = req.body;

    await Offer.findOneAndDelete({ offer_id });

    res.json({
      status: "success",
      message: "Offer Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/search_offer", async (req, res) => {
  try {
    const searchText = req.body.search || "";

    const offers = await Offer.find({
      $or: [
        { offer_name: { $regex: searchText, $options: "i" } },
        { offer_type: { $regex: searchText, $options: "i" } },
        { coupon_code: { $regex: searchText, $options: "i" } },
      ],
    });

    res.json(offers);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/update_offer", async (req, res) => {
  try {
    const { offer_id, ...updateData } = req.body;

    await Offer.findOneAndUpdate({ offer_id }, updateData);

    res.json({
      status: "success",
      message: "Offer Updated",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ====================== SERVER ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`⭐⭐⭐ SUPERMARKET SERVER STARTED ON PORT ${PORT} ⭐⭐⭐`);
});
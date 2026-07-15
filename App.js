const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const envPath = path.join(__dirname, ".env");

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");

    envContent.split(/\r?\n/).forEach((line) => {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith("#")) {
            return;
        }

        const separatorIndex = trimmedLine.indexOf("=");

        if (separatorIndex === -1) {
            return;
        }

        const key = trimmedLine.slice(0, separatorIndex).trim();
        let value = trimmedLine.slice(separatorIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        process.env[key] = value;
    });
}

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("MONGO_URL is not set in the .env file");
    process.exit(1);
}

mongoose.connect(mongoUrl)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

const Product = mongoose.model("Products", new mongoose.Schema(
{
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
    product_description: String
}
));

const Customer = mongoose.model("Customers", new mongoose.Schema(
{
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
    loyalty_points: String
}
));


const Offer = mongoose.model("Offers", new mongoose.Schema(
{
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
    offer_description: String
}
));


app.get("/test", (req, res) => {
    res.send("Supermarket Backend Working");
});


app.post("/add_product", async (req, res) => {

    await Product.create(req.body);

    res.json({
        status: "success"
    });

});

app.post("/view_product", async (req, res) => {

    const products = await Product.find();

    res.json(products);

});


app.post("/add_customer", async (req, res) => {

    await Customer.create(req.body);

    res.json({
        status: "success"
    });

});

app.post("/view_customer", async (req, res) => {

    const customers = await Customer.find();

    res.json(customers);

});

app.post("/add_offer", async (req, res) => {

    await Offer.create(req.body);

    res.json({
        status: "success"
    });

});

app.post("/view_offer", async (req, res) => {

    const offers = await Offer.find();

    res.json(offers);

});

app.post("/delete_product", async (req, res) => {

    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ status: "error", message: "product_id is required" });
    }

    await Product.findOneAndDelete({ product_id });

    res.json({ status: "success" });

});

app.post("/search_product", async (req, res) => {

    const searchText = req.body.search || "";

    const products = await Product.find({
        $or: [
            { product_name: { $regex: searchText, $options: "i" } },
            { category: { $regex: searchText, $options: "i" } },
            { brand: { $regex: searchText, $options: "i" } }
        ]
    });

    res.json(products);

});

app.post("/update_product", async (req, res) => {

    const { product_id, ...updateData } = req.body;

    if (!product_id) {
        return res.status(400).json({ status: "error", message: "product_id is required" });
    }

    await Product.findOneAndUpdate({ product_id }, updateData, { new: true });

    res.json({ status: "success" });

});

app.post("/delete_customer", async (req, res) => {

    const { customer_id } = req.body;

    if (!customer_id) {
        return res.status(400).json({ status: "error", message: "customer_id is required" });
    }

    await Customer.findOneAndDelete({ customer_id });

    res.json({ status: "success" });

});

app.post("/search_customer", async (req, res) => {

    const searchText = req.body.search || "";

    const customers = await Customer.find({
        $or: [
            { customer_name: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
            { phone_number: { $regex: searchText, $options: "i" } }
        ]
    });

    res.json(customers);

});

app.post("/update_customer", async (req, res) => {

    const { customer_id, ...updateData } = req.body;

    if (!customer_id) {
        return res.status(400).json({ status: "error", message: "customer_id is required" });
    }

    await Customer.findOneAndUpdate({ customer_id }, updateData, { new: true });

    res.json({ status: "success" });

});

app.post("/delete_offer", async (req, res) => {

    const { offer_id } = req.body;

    if (!offer_id) {
        return res.status(400).json({ status: "error", message: "offer_id is required" });
    }

    await Offer.findOneAndDelete({ offer_id });

    res.json({ status: "success" });

});

app.post("/search_offer", async (req, res) => {

    const searchText = req.body.search || "";

    const offers = await Offer.find({
        $or: [
            { offer_name: { $regex: searchText, $options: "i" } },
            { offer_type: { $regex: searchText, $options: "i" } },
            { coupon_code: { $regex: searchText, $options: "i" } }
        ]
    });

    res.json(offers);

});

app.post("/update_offer", async (req, res) => {

    const { offer_id, ...updateData } = req.body;

    if (!offer_id) {
        return res.status(400).json({ status: "error", message: "offer_id is required" });
    }

    await Offer.findOneAndUpdate({ offer_id }, updateData, { new: true });

    res.json({ status: "success" });

});

app.listen(3000, () => {

    console.log("⭐⭐⭐ SUPERMARKET SERVER STARTED ⭐⭐⭐");

});
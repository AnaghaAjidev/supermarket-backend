const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://anaghaajidev:Anagha23@ac-agnsoij-shard-00-00.lk3iujt.mongodb.net:27017,ac-agnsoij-shard-00-01.lk3iujt.mongodb.net:27017,ac-agnsoij-shard-00-02.lk3iujt.mongodb.net:27017/supermarket_db?ssl=true&replicaSet=atlas-bjgzxl-shard-0&authSource=admin&appName=Cluster0")
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

app.listen(3000, () => {

    console.log("⭐⭐⭐ SUPERMARKET SERVER STARTED ⭐⭐⭐");

});
import mongoose from "mongoose";
import { Product } from "./Product.js";

const products = Array.from({ length: 50 }, (_, index) => ({
    name: `Product ${index + 1}`,
    price: (index + 1) * 10,
    inStock: index % 5 !== 0
}));

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://admin123:123456@localhost:27018/db_for_learning?authSource=admin");

        await Product.deleteMany({});

        await Product.insertMany(products);

        console.log("Đã tạo 50 products");

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

seedProducts();
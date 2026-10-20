import mongoose from "mongoose";
import { User } from "./User.js";

const users = Array.from({ length: 50 }, (_, index) => ({
    username: `User ${index + 1}`,
    email: `khainq${index + 1}@gmail.com`,
    password: `Khaiquang${index + 1}`,
}));

const seedUsers = async () => {
    try {
        await mongoose.connect("mongodb://admin123:123456@localhost:27018/db_for_learning?authSource=admin");

        await User.deleteMany({});

        await User.insertMany(users);

        console.log("Đã tạo 50 users");

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

seedUsers();
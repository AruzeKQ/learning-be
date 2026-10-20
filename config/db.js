import mongoose from "mongoose";

mongoose.connect('mongodb://admin123:123456@localhost:27018/db_for_learning?authSource=admin')
    .then(() => console.log("Kết nối database thành công"))
    .catch((err) => console.log("đã xảy ra lỗi kết nối", err));
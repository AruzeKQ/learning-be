import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true // Bắt buộc phải có
    },
    email: {
        type: String,
        required: true,
        unique: true // Email không được trùng lặp
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})


userSchema.index({ email: 1 })
userSchema.index({ name: 'text' }) // text index


export const User = mongoose.model('User', userSchema);

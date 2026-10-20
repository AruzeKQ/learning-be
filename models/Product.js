import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

productSchema.index({ price: 1 }) // 1: là tăng dần , -1: là giảm dần
productSchema.index({ inStock: 1, price: -1 }) // (compound index) index kết hợp

export const Product = mongoose.model('Product', productSchema);
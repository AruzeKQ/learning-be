import { Product } from "../models/Product.js";


//@route  GET /api/products?page=1&limit=10&search=laptop&sort=-price
export const getProduct = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || '';
        const sort = req.query.sort || '-createdAt'

        const queryFilter = {
            name: {
                $regex: search,
                $options: 'i'
            }
        };

        const skip = (page - 1) * limit; // mặc định là 10

        const [products, totalProducts] = await Promise.all([
            Product.find(queryFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Product.countDocuments(queryFilter)
        ])

        const totalPages = Math.ceil(totalProducts / limit);

        res.status(200).json({
            success: true,
            pagination: {
                page,
                limit,
                totalProducts,
                totalPages,
            },
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: "đã xảy ra lỗi khi cố lấy dữ liệu để hiển thị",
            error: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            price: req.body.price
        }
        const createdProduct = await Product.create(newProduct);
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(400).json({ message: "Lỗi tạo dữ liệu", error: error.message })

    }
}

export const editProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const updateProduct = {
            name: req.body.name,
            price: req.body.price
        }
        const updatedProduct = await Product.findByIdAndUpdate(productID, updateProduct, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "không tìm thấy sản phẩm" })
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "lỗi cập nhật sản phẩm", error: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productID);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "không tìm thấy sản phẩm cần xóa"
            })
        }
        res.status(200).json({
            message: "đã xóa sản phẩm thành công!!",
            product: deletedProduct
        })
    } catch (error) {
        res.status(400).json({
            message: "Lỗi xóa sản phẩm",
            error: error.message
        });
    }
}
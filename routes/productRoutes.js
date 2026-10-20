import express from 'express';
import { getProduct, createProduct, editProduct, deleteProduct } from '../controllers/productController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.route('/')
    .get(getProduct)
    .post(protect, authorize('admin'), createProduct);

productRouter.route('/:id')
    .put(protect, authorize('admin'), editProduct)
    .delete(protect, authorize('admin'), deleteProduct);

export default productRouter;
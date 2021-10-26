import express from 'express'
const router = express.Router()
import * as product from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

router.route('/').get(product.getProducts).post(protect, admin, product.createProduct)
router.route('/:id/reviews').post(protect, product.createProductReview)
router.get('/top', product.getTopProducts)
router
	.route('/:id')
	.get(product.getProductById)
	.delete(protect, admin, product.deleteProduct)
	.put(protect, admin, product.updateProduct)

export default router

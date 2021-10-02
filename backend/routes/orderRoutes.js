import express from 'express'
const router = express.Router()
import * as order from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleWare.js'

router.route('/').post(protect, order.addOrderItems)
router.route('/myorders').get(protect, order.getMyOrders)
router.route('/:id').get(protect, order.getOrderById)
router.route('/:id/pay').put(protect, order.updateOrderToPaid)

export default router

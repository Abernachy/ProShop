import express from 'express'
const router = express.Router()
import * as order from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleWare.js'

router.route('/').post(protect, order.addOrderItems).get(protect, admin, order.getOrders)
router.route('/myorders').get(protect, order.getMyOrders)
router.route('/:id').get(protect, order.getOrderById)
router.route('/:id/pay').put(protect, order.updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, order.updateOrderToDelivered)

export default router

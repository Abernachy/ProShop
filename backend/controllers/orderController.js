import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@description  Create new Order
//@route  POST  /api/orders
//@acces  Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No order items')
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

		const createdOrder = await order.save()
		res.status(201).json(createdOrder)
	}
})

//@description  Get order by ID
//@route  Get  /api/orders/:id
//@acces  Private
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')

	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error('order not found')
	}
})

//@description  Update Order to paid
//@route  Get  /api/orders/:id/pay
//@acces  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('order not found')
	}
})

//@description  Get logged in user orders
//@route  Get  /api/orders/myorders
//@acces  Private
export const getMyOrders = asyncHandler(async (req, res) => {
	const order = await Order.find({ user: req.user.id })

	res.json(order)
})

//@description  Get all orders
//@route  Get  /api/orders
//@acces  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
	const order = await Order.find({}).populate('user', 'id name')
	res.json(order)
})

//@description  Update Order to delivered
// Out for delivery basically
//@route  Get  /api/orders/:id/deliver
//@acces  Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isDelivered = true
		order.deliveredAt = Date.now()

		const updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error('order not found')
	}
})

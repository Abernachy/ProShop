import axios from 'axios'
import * as order from '../constants/orderConstants'

export const createOrder = (ord) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.post(`/api/orders`, ord, config)

		dispatch({
			type: order.ORDER_CREATE_SUCCESS,
			payload: data,
		})

		// dispatch({
		// 	type: USER_LOGIN_SUCCESS,
		// 	payload: data,
		// })
		// localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: order.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: order.ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

		dispatch({
			type: order.ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_LIST_MY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/orders/myorders`, config)

		dispatch({
			type: order.ORDER_LIST_MY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_LIST_MY_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/orders/`, config)

		dispatch({
			type: order.ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const updateOrders = (ord) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_UPDATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.put(`/api/orders/${ord._id}`, ord, config)

		dispatch({
			type: order.ORDER_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
export const deleteOrder = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await axios.delete(`/api/orders/${id}`, config)

		dispatch({
			type: order.ORDER_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const deliverOrder = (ord) => async (dispatch, getState) => {
	try {
		dispatch({
			type: order.ORDER_DELIVER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.put(`/api/orders/${ord._id}/deliver`, {}, config)

		dispatch({
			type: order.ORDER_DELIVER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: order.ORDER_DELIVER_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

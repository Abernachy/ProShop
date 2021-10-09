import axios from 'axios'

import * as product from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: product.PRODUCT_LIST_REQUEST })
		const { data } = await axios.get('/api/products')
		dispatch({
			type: product.PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: product.PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: product.PRODUCT_DETAILS_REQUEST })
		const { data } = await axios.get(`/api/products/${id}`)
		dispatch({
			type: product.PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: product.PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: product.PRODUCT_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await axios.delete(`/api/products/${id}`, config)

		dispatch({
			type: product.PRODUCT_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: product.PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: product.PRODUCT_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.post(`/api/products`, {}, config)

		dispatch({
			type: product.PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: product.PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}
export const updateProduct = (prod) => async (dispatch, getState) => {
	try {
		dispatch({
			type: product.PRODUCT_UPDATE_REQUEST,
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
		const { data } = await axios.put(`/api/products/${prod._id}`, prod, config)

		dispatch({
			type: product.PRODUCT_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: product.PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		})
	}
}

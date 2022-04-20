import {
	CLEAR_ERRORS,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	MY_ORDERS_FAIL,
	MY_ORDERS_REQUEST,
	MY_ORDERS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS
} from "../constants/orderConstants"
import axios from "axios"
export const createOrder = order => async (dispatch) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST })
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		}
		const { data } = await axios.post("/api/v1/order/new", order, config)
		console.log(data)
		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message || error.message,
		})
	}
}
// My orders
export const myOrders = () => async (dispatch) => {
	try {
		dispatch({ type: MY_ORDERS_REQUEST })
		
		const { data } = await axios.get("/api/v1/orders/me")
		console.log(data)
		dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order })
	} catch (error) {
		dispatch({
			type: MY_ORDERS_FAIL,
			payload: error.response.data.message || error.message,
		})
	}
}
// order details
export const getOrderDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST })
		
		const { data } = await axios.get(`/api/v1/order/${id}`)
		console.log(data)
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
	} catch (error) {
		console.error({error})
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message || error.message,
		})
	}
}
export const clearErrors = () => async dispatch => {
	dispatch({ type: CLEAR_ERRORS })
}

import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	CLEAR_ERRORS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_REQUEST,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_RESET,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
} from "../constants/userConstants"
import axios from "axios"
import { toast } from "react-toastify"
import { config } from "dotenv"
// login
export const login = (email, password) => async dispatch => {
	try {
		dispatch({ type: LOGIN_REQUEST })
		const config = { headers: { "Content-Type": "application/json" } }
		const { data } = await axios.post(
			`/api/v1/login`,
			{ email, password },
			config
		)
		dispatch({ type: LOGIN_SUCCESS, payload: data.user })
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.message || error.response.data.message,
		})
		console.error({ error })
		toast.error(error.message || error.response.data.message)
	}
}
// register
export const register = userData => async dispatch => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST })
		const config = { headers: { "Content-Type": "multipart/form-data" } }
		const { data } = await axios.post(`/api/v1/register`, userData, { config })
		dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })
	} catch (e) {
		console.log(e)
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: e.response.data.message,
		})
	}
}
// Load User
export const loadUser = () => async dispatch => {
	try {
		dispatch({ type: LOAD_USER_REQUEST })
		// const config = { headers: { "Content-Type": "application/json" } }
		const { data } = await axios.get(`/api/v1/me`)
		console.log(data)
		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
	} catch (error) {
		dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
		console.log(error)
		// toast.error(error.message || error.response.data.message)
	}
}
// logout user
export const logOut = () => async dispatch => {
	try {
		await axios.get(`/api/v1/logout`)

		dispatch({ type: LOGOUT_SUCCESS })
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message || error.message,
		})
		console.log(error)
		toast.error(error.message || error.response.data.message)
	}
}
// update Profile
export const updateProfile = userData => async dispatch => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST })
		const config = { headers: { "Content-Type": "multipart/form-data" } }
		const { data } = await axios.put(`/api/v1/me/update`, userData, { config })
		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })
	} catch (e) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: e.response.data.message,
		})
	}
}
// update password
export const updatePassword = passwords => async dispatch => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST })
		const config = { headers: { "Content-Type": "application/json" } }

		// axios request start
		toast.info("Updating your password. Please wait...")
		const { data } = await axios.put(
			`/api/v1/password/update`,
			passwords,
			config
		)

		// axios request finish successfully
		toast.success("Your password has been uated successfully.")
		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
	} catch (e) {
		console.error({ e })
		// axios request failed
		toast.error("Could not update your password. " + e.response.data.error)
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: e.response.data.message,
		})
	}
}
// forgot password
export const forgotPassword = email => async dispatch => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST })
		const config = { headers: { "Content-Type": "application/json" } }

		// axios request start
		// toast.info("Updating your password. Please wait...")
		const { data } = await axios.post(`/api/v1/password/forgot`, email, config)
		console.log(data)
		// axios request finish successfully
		// toast.success("Your password has been uated successfully.")
		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
	} catch (e) {
		console.error({ e })
		// axios request failed
		// toast.error("Could not update your password. " + e.response.data.error)
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: e.response.data.message,
		})
	}
}
// Reset Password
export const resetPassword = (token, passwords) => async dispatch => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST })
		const config = { headers: { "Content-Type": "application/json" } }

		// axios request start
		// toast.info("Updating your password. Please wait...")
		const { data } = await axios.put(
			`/api/v1/password/reset/${token}`,
			passwords,
			config
		)
		console.log(data)
		// axios request finish successfully
		toast.success("Your password has been uated successfully.")
		dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })
	} catch (e) {
		console.error({ e })
		// axios request failed
		toast.error("Could not update your password. " + e.response.data.error)
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload: e.response.data.message,
		})
	}
}
// clearing Errors
export const clearErrors = () => async dispatch => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}

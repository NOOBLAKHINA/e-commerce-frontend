import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS
} from "../constants/productConstants";
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      console.log(data);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
    };
export const getAdminProduct = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_PRODUCT_REQUEST })
      const { data } = await axios.get('/api/v1/admin/products')
      dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload:data.products
      })
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_FAIL,
        payload:error.response.data.message
      })
    }
  }
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    console.log(data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// new Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const config = { headers: { "Content-type": "application/json" } };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    console.log(data);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
// clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

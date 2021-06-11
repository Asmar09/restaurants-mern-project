import axios from 'axios';
import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import {GET_PRODUCTS , CREATE_PRODUCTS , DELETE_PRODUCTS , EDIT_PRODUCT} from '../constants/productConstants';


export const createProduct = productData => async dispatch => {

    try{
      dispatch({type: START_LOADING})
    const response = await axios.post('/api/product' , productData)
    dispatch({type: STOP_LOADING})
    dispatch({type: SHOW_SUCCESS_MESSAGE , payload: response.data.successMessage})
    dispatch({type: CREATE_PRODUCTS , payload: response.data.product})

    }catch(err){
        console.log("Error while creating product" , err);
        dispatch({type: STOP_LOADING})
        dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
    }

}


export const getProducts = () => async dispatch => {

  try{
    dispatch({type: START_LOADING})
    const response = await axios.get('/api/product')
  dispatch({type: STOP_LOADING})
  dispatch({type: GET_PRODUCTS , payload: response.data.products})

  }catch(err){
      console.log("Error while fetching product" , err);
      dispatch({type: STOP_LOADING})
      dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
  }

}

export const deleteProducts = productId => async dispatch => {

  try{
    dispatch({type: START_LOADING})
    const response = await axios.delete(`/api/product/${productId}`)
  dispatch({type: STOP_LOADING})
  dispatch({type: DELETE_PRODUCTS , payload: response.data})

  }catch(err){
      console.log("Error while delete product" , err);
      dispatch({type: STOP_LOADING})
      dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
  }

}


export const editProduct = productId => async dispatch => {

  try{
    dispatch({type: START_LOADING})
    const response = await axios.get(`/api/product/${productId}`)
  dispatch({type: STOP_LOADING})
  dispatch({type: EDIT_PRODUCT , payload: response.data})

  }catch(err){
      console.log("Error while delete product" , err);
      dispatch({type: STOP_LOADING})
      dispatch({type: SHOW_ERROR_MESSAGE , payload: err.response.data.errorMessage})
  }

}
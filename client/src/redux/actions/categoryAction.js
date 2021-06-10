import {START_LOADING , STOP_LOADING} from '../constants/loadingConstants';
import {SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE} from '../constants/messageConstants';
import {GET_CATEGORIES , CREATE_CATEGORIES} from '../constants/categoryConstants';
import axios from 'axios';


export const getCategories = () => async dispatch => {
  try{
      dispatch({type: START_LOADING})
    const response = await axios.get('/api/category')
    dispatch({type: STOP_LOADING})
    dispatch({type: GET_CATEGORIES , payload: response.data.categories})
  }catch(e){
   console.log("Error while fetching category data" , e);
   dispatch({type: STOP_LOADING})
   dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response.data.errorMessage})
  }
}



export const createCategories = categoryData => async dispatch => {
  try{
      dispatch({type: START_LOADING})
      const config ={
        headers:{
            'Content-Type': "application/json"
        }
    }
    const response = await axios.post('/api/category' , categoryData , config)
    dispatch({type: STOP_LOADING})
   dispatch({type: SHOW_SUCCESS_MESSAGE , payload: response.data.successMessage})
   dispatch({type: CREATE_CATEGORIES , payload: response.data.category})
  }catch(e){
   console.log("Error while fetching category data" , e);
   dispatch({type: STOP_LOADING})
   dispatch({type: SHOW_ERROR_MESSAGE , payload: e.response.data.errorMessage})
  }
}



import {START_LOADING , STOP_LOADING} from '../constants/LoadingConstants';

const INITIAL_STATE = {
    loading: false
}

const laodingReducer = (state = INITIAL_STATE , action) =>{
     switch(action.type){
         case START_LOADING:
              return {
                  loading: true
              }
         case STOP_LOADING:
             return {
                 loading: false
             }
         default:
             return state
     }
}

export default laodingReducer
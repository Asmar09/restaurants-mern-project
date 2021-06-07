
import {applyMiddleware , combineReducers , createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import laodingReducer from '../redux/reducers/LoadingReducers';
import messageReducer from '../redux/reducers/MessageReducers';

const reducer =  combineReducers({
  loading: laodingReducer,
  messages: messageReducer
})

const initialState  = {}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store
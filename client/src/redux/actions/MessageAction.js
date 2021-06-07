
import {CLEAR_MESSAGES} from '../constants/MessageConstants';

export const clear_messages = () => dispatch =>{
   dispatch({
       type: CLEAR_MESSAGES
   })
}
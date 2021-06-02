import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {getLocalStorage} from '../helpers/localStorage';

const UserRoute = ({component: Component , ...rest }) => {
    return (
        <Route
            {...rest}
            render = {(props) => 
               {
                 if(getLocalStorage() && getLocalStorage().role === 0){
            return <Component {...props} />
                 }else{
                   return  <Redirect to="/signin"/>
                 }
               }
            }
            />

    )
}

export default UserRoute
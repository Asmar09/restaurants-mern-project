

import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {getLocalStorage} from '../helpers/localStorage';

const AdminRoute = ({component: Component , ...rest }) => {
    return (
        <Route
            {...rest}
            render = {(props) => 
               {
                 if(getLocalStorage() && getLocalStorage().role === 1){
            return <Component {...props} />
                 }else{
                   return  <Redirect to="/signin"/>
                 }
               }
            }
            />

    )
}

export default AdminRoute

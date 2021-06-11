

import React from 'react';
import {BrowserRouter , Switch , Route} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import NotFound from './NotFound';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import AdminEditProduct from './AdminEditProduct';
import './App.css'


const App = () => {

    return (
    <BrowserRouter>
     <Header />
     <main>
         <Switch>
             <Route exact path="/" component={Home} />
             <Route exact path="/signup" component={Signup} />
             <Route exact path="/signin" component={Signin} />
             <UserRoute exact path="/user/dashboard" component={UserDashboard} />
             <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
             <AdminRoute exact path="/admin/edit/product/:productId" component={AdminEditProduct} />

             <Route component={NotFound} />

         </Switch>
     </main>
    </BrowserRouter>

    )
}

export default App

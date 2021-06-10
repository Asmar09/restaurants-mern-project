import React from 'react';
import {useSelector} from 'react-redux';
import Card from '../components/Card';

const AdminBody = () => {

    const {products} = useSelector(state => state.products)
    return (
        <div className="container">
             <div className="row pb-3">
         {
             products.map(product => (
                  <Card key={product._id} product={product} />
             ))
         }
                  </div>
             </div>
    )
}

export default AdminBody

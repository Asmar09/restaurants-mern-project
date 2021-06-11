
import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteProducts} from '../redux/actions/productAction';

const Card = ({product}) => {

    const dispatch = useDispatch()
    return (
        <div className="col-md-4 my-3">
             <div className="card">
          <a href="#!">
              <img
              className="img-thumbnail"
               src={`/uploads/${product.fileName}`} 
               alt="product"
              />
          </a>
          <div className="card-body text-center">
              <h5>{product.productName}</h5>
              <hr />
              <h6 className="mb-3">
         <span className="text-secondary mr-2">
       {
           product.productPrice.toLocaleString('en-US' , {
                style: 'currency',
                currency: 'USD'
           })
       }
         </span>
              </h6>
              <p> {product.productDesc.length > 60 ? (product.productDesc.substring(0,60) + "....") : (product.productDesc.substring(0,60))}</p>
              <Link to={`/admin/edit/product/${product._id}`} type="button" className="btn btn-secondary btn-sm mr-1 my-1" style={{marginRight: '8px'}}>
                    <i className="far fa-edit pr-1"></i> Edit
              </Link>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProducts(product._id))}>
                    <i className="far fa-trash-alt pr-1"></i> Delete
              </button>
          </div>
             </div>
        </div> 
    )
}

export default Card

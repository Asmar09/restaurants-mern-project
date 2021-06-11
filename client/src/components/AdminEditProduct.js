
import React, {useState , useEffect  } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {editProduct} from '../redux/actions/productAction';

const AdminEditProduct = ({match}) => {
    const productId = match.params.productId
    
    const [productImage, setProductImage] = useState(null)
    const [productName, setProductName] = useState('')
    const [productDesc , setProductDesc] = useState('')
    const [productPrice , setProductPrice] = useState('')
    const [productCategory , setProductCategory] = useState('')
    const [productQty, setProductQty] = useState('')

    const dispatch = useDispatch()
   const {product} = useSelector(state => state.products)

    useEffect(() => {
        
        if(!product){
            dispatch(editProduct(productId))
        }else{
            setProductImage(product.fileName)
            setProductName(product.productName)
            setProductPrice(product.productPrice)
            setProductDesc(product.productDecs)
            setProductCategory(product.productCategory)
            setProductQty(product.productQty)
        }
    }, [dispatch , productId , product])

    return (
        <div>
         {productName}
        </div>
    )
}

export default AdminEditProduct

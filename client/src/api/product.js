
import axios from 'axios'


export const createProduct = async (productData) => {

    const response = await axios.post('/api/product' , productData)

    return response
}

import axios from 'axios'


export const createCategory = async (categoryData) => {
    const config ={
        headers:{
            'Content-Type': "application/json"
        }
    }
      
    const response = await axios.post('/api/category' , categoryData , config)

    return response
}


export const getCategories = async () => {
 
    const response = await axios.get('/api/category')

    return response
}
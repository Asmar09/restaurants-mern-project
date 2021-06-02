
import Cookies from 'js-cookie';


export const setCookie = (key , value) =>{
    Cookies.set(key , value , {expires: 1})

}

export const getCookie = () =>{
     Cookies.get('token')
    }

export const deleteCookie = (key) =>{
    Cookies.remove(key)
}
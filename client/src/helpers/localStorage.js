

export const setLocalStorage = (key ,value) =>{
      localStorage.setItem(key , JSON.stringify(value))
}

export const getLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('user'))
}

export const deleteLocalStorage = (key) =>{
      localStorage.removeItem(key)
}
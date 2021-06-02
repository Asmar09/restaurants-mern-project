import React, { useState, useEffect } from "react";
import {ErrorMessage} from '../helpers/message';
import {Loading} from '../helpers/loading';
import {Link , useHistory} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import {signin} from '../api/auth';
import {setAuthentication } from '../helpers/auth';
import {getLocalStorage} from '../helpers/localStorage';

const Signin = () => {
  let history = useHistory()


  useEffect(() => {
    let storage =  getLocalStorage()
    if(storage && storage.role === 1){
      history.push('/admin/dashboard')
    }else if(storage && storage.role === 0){
       history.push('/user/dashboard')
    }
  }, [history])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const handleChange = (evt) =>{
    setFormData({
        ...formData,
        [evt.target.name]: evt.target.value,
        errorMsg: false
    })
      }
 
      const handleSubmit = async (evt) =>{
        evt.preventDefault()
        if( isEmpty(email) || isEmpty(password)){
            setFormData({
              ...formData,
               errorMsg: "All fields are required"
            })
        }else if(!isEmail(email)){
         setFormData({
           ...formData,
            errorMsg: "Email is invalid"
         })   
        }else{
         
         const {email, password} = formData
         const data  = { email , password}
     
           setFormData({ 
              ...formData,
              loading: true
           })
           signin(data).then( (response) =>{
            
            setAuthentication(response.data.token , response.data.user);
            let storage =  getLocalStorage()
             if(storage && storage.role === 1){
               history.push('/admin/dashboard')
             }else{
                history.push('/user/dashboard')
             }
        //  setFormData({
        //    username: "",
        //    email: "",
        //    password: "",
        //    password2:"",
        //    loading: false,
        //    errorMsg: false,
        //    successMsg: response.data.successMessage
        //  })
           }).catch(err =>{
             setFormData({...formData , loading: false , errorMsg: err.response.data.errorMessage})
           })
        }
   
       }
       
  const { email, password,  errorMsg, loading } = formData;

  return (
    <div className="signin-container">
    <div className="row px-3c mw-100 vh-100">
   <div className="col-md-5 mx-auto align-self-center">
     <div>
     {
      loading !== false ? <div className="text-center pb-4"> { Loading() }</div>
      : null
    }
     </div>
   
    <div>
    {
      errorMsg !== false ? ErrorMessage(errorMsg)
      : null
    }
    </div>
   
  <form className="signup-form" onSubmit={(e) => handleSubmit(e)} noValidate>
    <div className="form-group input-group flex-nowrap mb-3">
      <span className="input-group-text" id="addon-wrapping">
        <i className="fas fa-envelope"></i>
      </span>
      <input
        type="email"
        className="form-control"
        placeholder="Email Address"
        aria-label="Email Address"
        aria-describedby="addon-wrapping"
        name="email"
        value={email}
        onChange={handleChange}
      />
    </div>
    <div className="form-group input-group flex-nowrap mb-3">
      <span className="input-group-text" id="addon-wrapping">
        <i className="fas fa-lock"></i>
      </span>
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        aria-label="Password"
        aria-describedby="addon-wrapping"
        name="password"
        value={password}
        onChange={handleChange}
      />
    </div>
    <div className="form-group">
      <button className="btn btn-primary" type="submit">
         SignIn
      </button>
    </div>
    <p className="text-center text-white">
      Don't have an account ? <Link to="/signup">Register here</Link>
    </p>
  </form>
  </div>
    </div>
</div>
  );
};

export default Signin;

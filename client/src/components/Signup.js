import React,{useState , useEffect} from "react";
import {Link , useHistory} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import {ErrorMessage, SuccessMessage} from '../helpers/message';
import {Loading} from '../helpers/loading';
import {signup} from '../api/auth';
import {getLocalStorage} from '../helpers/localStorage';

const Signup = () => {
  let history = useHistory()

  useEffect(() => {
    let storage =  getLocalStorage()
    if(storage && storage.role === 1){
      history.push('/admin/dashboard')
    }else if(storage && storage.role === 0){
       history.push('/user/dashboard')
    }
  }, [history])

      const [formData , setFormData] = useState({
          username: "",
          email: "",
          password: "",
          password2:"",
          successMsg: false,
          errorMsg: false,
          loading: false
      })

      const {username, email, password, password2,successMsg,errorMsg,loading} = formData

      const handleChange = (evt) =>{
   setFormData({
       ...formData,
       [evt.target.name]: evt.target.value,
       successMsg: false,
       errorMsg: false
   })
     }

     const handleSubmit = (evt) =>{
     evt.preventDefault()
   if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
       setFormData({
         ...formData,
          errorMsg: "All fields are required"
       })
   }else if(!isEmail(email)){
    setFormData({
      ...formData,
       errorMsg: "Email is invalid"
    })   
   } else if(!equals(password , password2)){
    setFormData({
      ...formData,
       errorMsg: "passwords do not match"
    })   
   }else{
    
    const {email, username, password} = formData
    const data  = {username, email , password}

      setFormData({ 
         ...formData,
         loading: true
      })

      signup(data).then( (response) =>{
    setFormData({
      username: "",
      email: "",
      password: "",
      password2:"",
      loading: false,
      errorMsg: false,
      successMsg: response.data.successMessage
    })
      }).catch(err =>{
        setFormData({...formData , loading: false , errorMsg: err.response.data.errorMessage})
      })
   }

    }

  return (
    <div className="signup-container">
        <div className="row px-3c mw-100 vh-100">
       <div className="col-md-5 mx-auto align-self-center">
       <div>
       {
          successMsg !== false ? SuccessMessage(successMsg)
          : null
        }
         </div>
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
       
      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group input-group flex-nowrap  mb-3">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fas fa-user"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-wrapping">
            <i className="fas fa-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            aria-describedby="addon-wrapping"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Create Account
          </button>
        </div>
        <p className="text-center text-white">
          Have an account ? <Link to="/signin">Login</Link>
        </p>
      </form>
      </div>
        </div>
    </div>
  );
};

export default Signup;

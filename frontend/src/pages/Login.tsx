import { apiRequest } from "../helpers/apiRequest";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import {userName} from "../redux/userSlice"
import { toast } from 'react-toastify';

interface LoginData {
  email : string;
  password : string;
}
interface ErrorResponse {
  email?: string;
  password?: string;
}

function Login(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [loginData,setLoginData] = useState<LoginData>({email : "", password : ""});
    const [error, setError] = useState<ErrorResponse>({});
   
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
     const {name, value} = e.target;
      setError((pre) => ({...pre,[name] : ""}))
      setLoginData((pre) => ({...pre,[name] : value }));
    }

    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errorStack : ErrorResponse = {};
      if(!loginData.password){
        errorStack.password = "Field cannot be empty !"
      }
      if(!loginData.email.trim()){
        errorStack.email = "Field cannot be empty !"
      }
      else{
            const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!mailRegex.test(loginData.email)){
              errorStack.email = "Invalid email !"
            }
      }

      if(Object.keys(errorStack).length > 0){
        setError(errorStack);
        return;
      }
      
      try{
      const response = await apiRequest('/login', 'post', loginData);
      if(!response){
        toast.error('Incorrect Email or Password');
        return;
      }
      const data = response?.data;
      dispatch(userName(data.username));
      const token = response?.headers['authorization'];
      localStorage.setItem('token',token);
      toast.success('Login Successfull');
      navigate('/home'); 
      }
      catch(err){
        toast.error(`login server not reached : ${err}`);
      }
    }

return (
        <div id="login">
            <form onSubmit={handleSubmit}>
              <h2>LOGIN</h2>
              <label htmlFor="email">Email :
              <br />  
              <input id="email" type="email" name="email" onChange = {handleChange} />
              </label>
              {error.email && <p className="error">{error.email}</p> }
              <br />
              <label htmlFor="password">Password :
              <br />  
              <input id="password" type="password" name="password" onChange = {handleChange} />
              </label>
              {error.password && <p className="error">{error.password}</p> }
              <div className="login-btn form-button">
              <button type="submit">Submit</button>
              <span>if not registered ? <Link to='/signup'>Signup</Link></span>
              </div>
           </form>
        </div>
    )
}
export default Login;
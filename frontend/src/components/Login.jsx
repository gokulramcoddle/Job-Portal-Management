import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(){
  const navigate = useNavigate();
    const [loginData,setLoginData] = useState({email : "", password : ""});
    const [error, setError] = useState({});
   
    const handleChange = (e) => {
     const {name, value} = e.target;
      setError((pre) => ({...pre,[name] : ""}))
      setLoginData((pre) => ({...pre,[name] : value }));
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      const errorStack = {};
      if(!loginData.password){
        errorStack.password = "Field cannot be empty !"
      }
      if(!loginData.email.trim()){
        errorStack.email = "Field cannot be empty !"
      }
      else{
            const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!mailRegex.test(loginData.email)){
              errorStack.email = "Invalid email !"
            }
      }

      if(Object.keys(errorStack).length > 0){
        setError(errorStack);
        return;
      }
      
      try{
        const response = await fetch('http://localhost:2002/login', 
          {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(loginData)
          });
      if(response.ok){
        const data = await response.json();
         localStorage.setItem('email',loginData.email);
         const token = response.headers.get('Authorization');
          localStorage.setItem('token',token);
          localStorage.setItem('username',data.user);
           alert('Login Successfull'); 
           navigate('/home'); 
      }
      else{
        alert('Login Failed Invalid Credentials');
      }
    }
    catch(err){
      console.log(err.message);
      alert('Server side error');
    }
  }

return (
        <div id="login">
            <form onSubmit={handleSubmit}>
              <h2>LOGIN</h2>
              <label>Email :</label>
              <input type="email" name="email" onChange = {handleChange} />
              {error.email && <p className="error">{error.email}</p> }
              <br />
              <label>Password :</label>
              <input type="password" name="password" onChange = {handleChange} />
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
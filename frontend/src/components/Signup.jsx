import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import '../'
function Signup(){
  const navigate = useNavigate();
    const [registerData,setRegisterData] = useState({firstname : "", lastname : "", email : "", password : ""});
    const [error, setError] = useState({});
    const handleChange = (e) => {
     const {name, value} = e.target;
     setError((prev) => ({ ...prev, [name]: "" }));
     setRegisterData((pre) => ({...pre,[name] : value }));
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      let errorOn = {};
     if(!registerData.firstname.trim()){
       errorOn.firstname = "Field cannot be empty !"
     }
     if(!registerData.lastname.trim()){
      errorOn.lastname = "Field cannot be empty !"
     }
     if(!registerData.password){
      errorOn.password = "Field cannot be empty !"
     }
     if(!registerData.email.trim()){
      errorOn.email = "Field cannot be empty !"
     }
     else{
      const emailFormatCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailFormatCheck.test(registerData.email)){
       errorOn.email = "Invalid email"
      }
     }

     if(Object.keys(errorOn).length > 0 ){
      setError(errorOn);
      return ;
     }
      try{
        const response = await fetch('http://localhost:2002/signup', 
          {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(registerData)
          }
        );
      if(response.ok){
        alert('Registered Successfull Login now');
        navigate('/login');
      }
      else{
        console.log('Error registeration');
      }
    }
    catch(err){
      console.log(err.message);
      alert('Server side error');
    }
  }
  

return (
        <div id="signup">
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>
            <label>Firstname :</label>
              <input type="text" name="firstname" onChange = {handleChange} />
              {error.firstname && <p className="error">{error.firstname}</p>}
              <br />
              <label>Lastname :</label>
              <input type="text" name="lastname" onChange = {handleChange} />
              {error.lastname && <p className="error">{error.lastname}</p>}
              <br/>
              <label>Email :</label>
              <input type="email" name="email" onChange = {handleChange} />
              {error.email && <p className="error">{error.email}</p>}
              <br/>
              <label>Password :</label>
              <input type="password" name="password" onChange = {handleChange} />
              {error.password && <p className="error">{error.password}</p>}
              <div className="signup-btn form-button">
              <button type="submit">Register</button>
              <span>Already registered ? <Link to='/login'>Login</Link></span>
              </div>
           </form>
        </div>
    )
}

export default Signup;
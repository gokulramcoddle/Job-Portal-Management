import { useState, ChangeEvent, FormEvent } from "react";
import { apiRequest } from "../helpers/apiRequest";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

interface SignupData{
  firstname: string;
  lastname:string;
  email:string;
  password:string;
}

interface ErrorData{
  firstname?: string;
  lastname?:string;
  email?:string;
  password?:string;
}

function Signup(){
  const navigate = useNavigate();
    const [registerData,setRegisterData] = useState<SignupData>({firstname : "", lastname : "", email : "", password : ""});
    const [error, setError] = useState<ErrorData>({});
    
    const handleChange = (e : ChangeEvent <HTMLInputElement> ) => {
     const {name, value} = e.target;
     setError((prev) => ({ ...prev, [name]: "" }));
     setRegisterData((pre) => ({...pre,[name] : value }));
    }

    const handleSubmit = async(e : FormEvent <HTMLFormElement>) => {
      e.preventDefault();
      let errorOn : ErrorData = {};
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
      const emailFormatCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailFormatCheck.test(registerData.email)){
       errorOn.email = "Invalid email"
      }
     }

     if(Object.keys(errorOn).length > 0 ){
      setError(errorOn);
      return ;
     }
      try{
      const response = await apiRequest("/signup", "post", registerData);
      if(response){
        toast.success('User registered successfull')
        navigate('/login');
      }
    }
    catch(err){
      toast.error(`Unable to post data: ${err}`);
    }
  }
  

return (
        <div id="signup">
            <form onSubmit={handleSubmit}>
              <h2>Register</h2>
              <label>Firstname :
              <br />
              <input type="text" name="firstname" onChange = {handleChange} />
              </label>
              {error.firstname && <p className="error">{error.firstname}</p>}
              <br />
              <label>Lastname :
              <br />
              <input type="text" name="lastname" onChange = {handleChange} />
              </label>
              {error.lastname && <p className="error">{error.lastname}</p>}
              <br/>
              <label>Email :
              <br />
              <input type="email" name="email" onChange = {handleChange} />
              </label>
              {error.email && <p className="error">{error.email}</p>}
              <br/>
              <label>Password :
              <br />
              <input type="password" name="password" onChange = {handleChange} />
              </label>
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
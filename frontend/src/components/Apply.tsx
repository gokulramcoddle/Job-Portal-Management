import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";
import {ProtectedRoute} from "./ProtectedRoute";

 
 interface apply{
        "firstname" : string,
        "lastname" : string,
        "gender" : string,
        "dob": string,
        "tenth_percentage" : number,
        "twelth_percentage" : number ,
        "university_cgpa" : number,
        "skills" : string,
        "experience": number,
        "about_you" : string
 }

 interface errorData{
       "firstname"?: string,
        "lastname"?: string,
        "dob"?: string,
        "tenth_percentage"?: string,
        "twelth_percentage"?: string ,
        "university_cgpa"?: string,
        "skills"?: string,
        "experience" ?: string,
        "about_you" ?: string
  }

 function Apply(){
    const navigate = useNavigate();
    const {id} = useParams();
     const [Application,setApplication] = useState<apply>({
        "firstname" : "",
        "lastname" : "",
        "gender" :"male",
        "dob": "",
        "tenth_percentage" : 0,
        "twelth_percentage" : 0,
        "university_cgpa" : 0,
        "skills" : "",
        "experience": 0,
        "about_you" : ""
     });
 
     const [error, setError] = useState<errorData>({});

  const handleChange = async(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setError((prev) => ({...prev,[name] : ""}));
     setApplication((prev) => ({...prev,[name] : value}));       
   }  
    
  const handleSubmit = async(e : FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let errorOn : errorData = {};

    if(!Application.firstname.trim()){
      errorOn.firstname = "Field cannot be empty !"
    }
    if(!Application.lastname.trim()){
     errorOn.lastname = "Field cannot be empty !"
    }
    if(!Application.dob){
     errorOn.dob = "Field cannot be empty !"
    }
    if(!Application.tenth_percentage){
        errorOn.tenth_percentage = "Field cannot be empty !" 
    }
    else if(isNaN(Application.tenth_percentage)){
        errorOn.tenth_percentage = "Input is Non-Numeric !"
    }
    if(!Application.twelth_percentage){
        errorOn.twelth_percentage = "Field cannot be empty !" 
    }else if(isNaN(Application.twelth_percentage)){
        errorOn.twelth_percentage = "Input is Non-Numeric !"
    }
    if(!Application.university_cgpa){
        errorOn.university_cgpa = "Field cannot be empty !"
    }else if(isNaN(Application.university_cgpa)){
        errorOn.university_cgpa = "Input is Non-Numeric !"
    }
    if(!Application.skills){
        errorOn.skills = "Field cannot be empty !"
    }
    if(!Application.experience){
        errorOn.experience = "Field cannot be empty !"
    }

    if(Object.keys(errorOn).length > 0){
        setError(errorOn);
        return;
    }

    try{
          const response = await apiRequest(`/application/add/${id}`, "post", Application);
          if(response){
            toast.success('Job applied successfull');
            navigate('/home');
          }
        }
        catch(err){
          console.log(err);
        }
 }

    return(
        <div id="application-form">
        <form onSubmit={handleSubmit}>
                      <h2>Application Form :</h2>
                      <label htmlFor="firstname">Firstname :
                      <br />
                      <input type="text" name="firstname" onChange = {handleChange} />
                      </label>
                      {error.firstname && <p className="error">{error.firstname}</p>}
                      <br />
                      <label htmlFor="lastname">Lastname :
                      <br />
                      <input type="text" name="lastname" onChange = {handleChange} />
                      </label>
                      {error.lastname && <p className="error">{error.lastname}</p>}
                      <br/>
                      <label htmlFor="gender">Gender :
                      <br />
                      <label htmlFor="male">Male <input type="radio" name="gender" value="male" onChange = {handleChange} /> </label>
                      <label htmlFor="female">Female </label><input type="radio" name="gender" value="female" onChange = {handleChange} /> </label>
                      <br/>
                      <label htmlFor="dob">Date of Birth :
                      <br />
                      <input type="date" name="dob" onChange = {handleChange} max={new Date().toISOString().split("T")[0]} />
                      </label>
                      {error.dob && <p className="error">{error.dob}</p>}
                      <br />
                      <label htmlFor="tenth_percentage">10th Percentage :
                      <br />
                      <input type="text" name="tenth_percentage" onChange = {handleChange} />
                      </label>
                      {error.tenth_percentage && <p className="error">{error.tenth_percentage}</p>}
                      <br />
                      <label htmlFor="twelth_percentage">12th Percentage :
                      <br />
                      <input type="text" name="twelth_percentage" onChange = {handleChange} />
                      </label>
                      {error.twelth_percentage && <p className="error">{error.twelth_percentage}</p>}
                      <br />
                      <label htmlFor="university_cgpa">University CGPA :
                      <br />
                      <input type="text" name="university_cgpa" onChange = {handleChange} />
                      </label>
                      {error.university_cgpa && <p className="error">{error.university_cgpa}</p>}
                      <br />
                      <label htmlFor="skills">Skills :
                      <br />
                      <textarea name="skills" cols={30} rows={3} value={Application.skills} onChange={handleChange}></textarea>
                      </label>
                      {error.skills && <p className="error">{error.skills}</p>}
                      <br />
                      <label htmlFor="experience">Experience :
                      <br />
                      <input type="number" min={0} name="experience" onChange = {handleChange} />
                      </label>
                      {error.experience && <p className="error">{error.experience}</p>}
                      <br />
                      <label htmlFor="about_you">About You :
                      <br />
                      <textarea name="about_you" cols={30} rows={10} value={Application.about_you} onChange ={handleChange}></textarea>
                      </label>
                      <br />
                      <div className="apply">
                      <button type="submit">Apply</button>
                      </div>
                   </form>
                </div>
    );
 }

 export default ProtectedRoute(Apply);
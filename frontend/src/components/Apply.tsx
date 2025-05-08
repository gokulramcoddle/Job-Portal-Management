import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../helpers/apiRequest";
import {ProtectedRoute} from "./ProtectedRoute";

 
 interface ApplyValues{
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

 interface ErrorData{
       "firstname"?: string,
        "lastname"?: string,
        "dob"?: string,
        "gender"?:string,
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
     const [application,setApplication] = useState<ApplyValues>({
        "firstname" : "",
        "lastname" : "",
        "gender" :"",
        "dob": "",
        "tenth_percentage" : 0,
        "twelth_percentage" : 0,
        "university_cgpa" : 0,
        "skills" : "",
        "experience": 0,
        "about_you" : ""
     });
 
     const [error, setError] = useState<ErrorData>({});

  const handleChange = async(e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setError((prev) => ({...prev,[name] : ""}));
     setApplication((prev) => ({...prev,[name] : value}));       
   }  
    
  const handleSubmit = async(e : FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    let errorOn : ErrorData = {};

    if(!application.firstname.trim()){
      errorOn.firstname = "Field cannot be empty !"
    }
    if(!application.lastname.trim()){
     errorOn.lastname = "Field cannot be empty !"
    }
    if(!application.gender){
     errorOn.gender = "Field cannot be empty !"
    }
    if(!application.dob){
     errorOn.dob = "Field cannot be empty !"
    }
    if(!application.tenth_percentage){
        errorOn.tenth_percentage = "Field cannot be empty !" 
    }
    else if(isNaN(application.tenth_percentage)){
        errorOn.tenth_percentage = "Input is Non-Numeric !"
    }
    if(!application.twelth_percentage){
        errorOn.twelth_percentage = "Field cannot be empty !" 
    }else if(isNaN(application.twelth_percentage)){
        errorOn.twelth_percentage = "Input is Non-Numeric !"
    }
    if(!application.university_cgpa){
        errorOn.university_cgpa = "Field cannot be empty !"
    }else if(isNaN(application.university_cgpa)){
        errorOn.university_cgpa = "Input is Non-Numeric !"
    }
    if(!application.skills){
        errorOn.skills = "Field cannot be empty !"
    }
    if(!application.experience){
        errorOn.experience = "Field cannot be empty !"
    }

    if(Object.keys(errorOn).length > 0){
        setError(errorOn);
        return;
    }

    try{
          const response = await apiRequest(`/application/add/${id}`, "post", application);
          if(response){
               toast.success('Job applied successfull');
                navigate('/home');
          }
        }
        catch(err){
          toast.error(`Unable to fetch data: ${err}`);
        }
 }

    return(
    <div id="application-form">
         <h1>APPLICATION FORM</h1>
        <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Firstname :
                <br />
                  <input id="firstname" type="text" name="firstname" onChange = {handleChange} />
                </label>
                  {error.firstname && <p className="error">{error.firstname}</p>}
                <br />
                <label htmlFor="lastname">Lastname :
                <br />
                  <input id="lastname" type="text" name="lastname" onChange = {handleChange} />
                </label>
                  {error.lastname && <p className="error">{error.lastname}</p>}
                <br/>
                <label htmlFor="gender">Gender:
                <div className="gender-options">
                <label htmlFor="male" className="gender-male-radio-btn">
                  <input id="male" className="radio-btn" type="radio" name="gender" value="male" onChange={handleChange} />{' '}
                   Male
                 </label>
                <label htmlFor="female">
                  <input id="female" className="radio-btn" type="radio" name="gender" value="female" onChange={handleChange} />{' '}
                  Female
                </label>
                </div>
                </label>
                  {error.gender && <p className="error">{error.gender}</p>}
                 <br />
                <label htmlFor="dob">Date of Birth :
                  <br />
                  <input id="dob" type="date" name="dob" onChange = {handleChange} max={new Date().toISOString().split("T")[0]} />
                </label>
                  {error.dob && <p className="error">{error.dob}</p>}
                  <br />
                <label htmlFor="tenth_percentage">10th Percentage :
                  <br />
                  <input id="tenth_percentage" type="text" name="tenth_percentage" onChange = {handleChange} />
                </label>
                  {error.tenth_percentage && <p className="error">{error.tenth_percentage}</p>}
                  <br />
                <label htmlFor="twelth_percentage">12th Percentage :
                  <br />
                  <input id="twelth_percentage" type="text" name="twelth_percentage" onChange = {handleChange} />
                </label>
                  {error.twelth_percentage && <p className="error">{error.twelth_percentage}</p>}
                  <br />
                <label htmlFor="university_cgpa">University CGPA :
                  <br />
                  <input id="university_cgpa" type="text" name="university_cgpa" onChange = {handleChange} />
                </label>
                  {error.university_cgpa && <p className="error">{error.university_cgpa}</p>}
                  <br />
                <label htmlFor="skills">Skills :
                  <br />
                  <textarea id="skills" name="skills" cols={40} rows={3} value={application.skills} onChange={handleChange}></textarea>
                </label>
                  {error.skills && <p className="error">{error.skills}</p>}
                  <br />
                <label htmlFor="experience">Experience :
                  <br />
                  <input id="experience" type="number" min={0} name="experience" onChange = {handleChange} />
                </label>
                   {error.experience && <p className="error">{error.experience}</p>}
                    <br />
                <label htmlFor="about_you">About You :
                    <br />
                    <textarea id="about_you" name="about_you" cols={50} rows={10} value={application.about_you} onChange ={handleChange}></textarea>
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
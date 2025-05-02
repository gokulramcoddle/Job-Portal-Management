import { useState, useEffect } from "react"
import { apiRequest } from "../helpers/apiRequest";
import { useNavigate } from "react-router-dom";
function Job(){  
 
  interface listJob{
    ID: number;
    jobtitle: string;
    company: string;
    location: string;
    postedOn: string;
  }
  const [ job, setJob ] = useState<listJob[]>([]) 

useEffect(() => { 
    jobList();
  },[])

     const jobList = async() =>{
        const token = localStorage.getItem('token');
        if(!token)
            {
                console.log('Token not exist');
            }
        try{
        const response = await apiRequest("/job", "get");
        setJob(response?.data);
    }
    catch(err){
        console.error(err);
    }
}

const navigate = useNavigate();
  const handleApply = (jobID : number ) => {
    navigate(`/apply/${jobID}`)
  }

    return(
        <>
        <h2>Job List</h2>
        {job?.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          job.map((job, index) => (
            <div className="jobBox" key={index}>
              <h2>{job.jobtitle}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.postedOn}</p>
              <button onClick={() => handleApply(job.ID)}>Apply</button>
            </div>
          ))
        )}
      </>
    )
}

export default Job;
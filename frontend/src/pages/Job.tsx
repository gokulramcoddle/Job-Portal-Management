import { useState, useEffect, ChangeEvent } from "react"
import { apiRequest } from "../helpers/apiRequest";
import { useNavigate} from "react-router-dom";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { toast } from "react-toastify";

interface ListJob{
  ID: number;
  jobtitle: string;
  company: string;
  location: string;
  postedOn: string;
}

function Job(){   
  const navigate = useNavigate();
  const [ job, setJob ] = useState<ListJob[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [jobLocation, setJobLocation] = useState<string>("");

useEffect(() => { 
     jobList(); 
     fetchAppliedJobs();  
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
      toast.error(`Unable to fetch job data: ${err}`);
    }
}
const fetchAppliedJobs = async() => {
  try {
    const res = await apiRequest("/application/user", "get");
    const applied = res?.data?.map((app: any) => app.jobpostID);
    setAppliedJobs(applied || []);
  } catch (err) {
    toast.error(`Error fetching user applications: ${err}`);
  }
};

const fetchJobByLocation = async(location: string) => {
  try{
   const response = await apiRequest("/job/location","post",{location});
   setJob(response?.data || []);
  }
  catch(err){
    toast.error(`Error fetching job by location: ${err}`);
  }
}

const handleChange = async(e : ChangeEvent<HTMLSelectElement>) => {
  const {value} = e.target;
  setJobLocation(value);
  if(value === ""){
    await jobList();
  }
  else{
    await fetchJobByLocation(value);
  }
}

const handleApply = (jobID: number) => {
  if (appliedJobs.includes(jobID)) {
    toast.warn("You have already applied for this job!");
    return;
  }
  navigate(`apply/${jobID}`);
};

    return(
        <>
        <div className="job-top-portion">
        <h2 className="job-heading">
           JOB LIST <span>{jobLocation.toUpperCase()}</span>
        </h2>
        <select className="sort-dropdown" onChange = {handleChange}>
            <option value="">Sort by location</option>
            <option value="Banglore">Banglore</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kerala">Kerala</option>
            <option value="Pune">Pune</option>
       </select>
       </div>
        {job.length === 0 ? (
          <p className="not-found">No jobs found.</p>
        ) : (
        <div className="job-list">
          {job.map((job, index) => (
            <div className="job-box" key={job.ID}>
              <h2>{job.jobtitle}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.postedOn.slice(0, 10)}</p>
              <button onClick={() => handleApply(job.ID)}>Apply</button>
            </div>
         ))
        }
       </div> 
      )}
      </>
    )
}

export default ProtectedRoute(Job);
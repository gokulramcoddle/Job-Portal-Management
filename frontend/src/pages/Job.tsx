import { useState, useEffect } from "react"
import { apiRequest } from "../helpers/apiRequest";
import { useNavigate} from "react-router-dom";
import { ProtectedRoute } from '../components/ProtectedRoute';
import { toast, ToastContainer } from "react-toastify";

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
        console.error(err);
    }
}
const fetchAppliedJobs = async () => {
  try {
    const res = await apiRequest("/application/user", "get");
    const applied = res?.data?.map((app: any) => app.jobpostID);
    setAppliedJobs(applied || []);
  } catch (err) {
    console.error("Error fetching user applications", err);
  }
};

const handleApply = (jobID: number) => {
  if (appliedJobs.includes(jobID)) {
    toast.error("You have already applied for this job!");
    return;
  }
  navigate(`apply/${jobID}`);
};

    return(
        <>
        <h2>Job List</h2>
        {job.length === 0 ? (
          <p className="not-found">No jobs found.</p>
        ) : (
          job.map((job, index) => (
            <div className="jobBox" key={job.ID}>
              <h2>{job.jobtitle}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.postedOn.slice(0, 10)}</p>
              <button onClick={() => handleApply(job.ID)}>Apply</button>
            </div>
          ))
        )}
        <ToastContainer />
      </>
    )
}

export default ProtectedRoute(Job);
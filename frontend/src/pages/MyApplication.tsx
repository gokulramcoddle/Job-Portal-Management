import { useEffect, useState } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { apiRequest } from '../helpers/apiRequest';
import { toast } from 'react-toastify';

interface ListApplication{
    ID : number,
    jobtitle: string;
    company: string;
    location: string;
    salary:number;
    applied_on: string;
  }

function MyApplication(){
       const [ application, setApplication ] = useState<ListApplication[]>([]) 
     
     useEffect(() => { 
          applicationList();   
       },[])
     
          const applicationList = async() =>{
             const token = localStorage.getItem('token');
             if(!token)
                 {
                     console.log('Token not exist');
                 }
             try{
             const response = await apiRequest("/application/user", "get");
             setApplication(response?.data);
         }
         catch(err){
            toast.error(`Unable to fetch data: ${err}`);
         }
     }
     
    return(
        <>
        <h2 className='myapplication-heading'>MY APPLICATION</h2>
        {!application ? (
          <p className='not-found'>No Application found.</p>
        ) : (
          <div className="application-list">
          {application.map((a, index) => (
            <div className="application-box" key={a.ID}>
              <h2>{a.jobtitle}</h2>
              <p>{a.company}</p>
              <p>{a.location}</p>
              <p>
                 Applied On: <span>{a.applied_on.slice(0, 10)}</span>
              </p>
            </div>
          ))
        }
        </div>
        )}
      </>
    )
}

export default ProtectedRoute(MyApplication);
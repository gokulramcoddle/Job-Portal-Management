import { useEffect, useState } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { apiRequest } from '../helpers/apiRequest';

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
             console.error(err);
         }
     }
     
    return(
        <>
        <h2>My Application</h2>
        {!application ? (
          <p className='not-found'>No Application found.</p>
        ) : (
          application.map((a, index) => (
            <div className="application" key={a.ID}>
              <h2>{a.jobtitle}</h2>
              <p>{a.company}</p>
              <p>{a.salary}</p>
              <p>{a.location}</p>
              <p>{a.applied_on.slice(0, 10)}</p>
            </div>
          ))
        )}
      </>
    )
}

export default ProtectedRoute(MyApplication);
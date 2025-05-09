import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';

function Home(){
    const navigate = useNavigate();
    return(
        <div className='home'>
        <h1 >WELCOME TO <span>JOB</span>HUNT</h1>
        <p>Explore job opportunities from top companies.
           Apply easily, track your applications, and land your dream job with JobHunt.
        </p>
        <h3>
           Start hunting. Start winning...
        </h3>
         <button onClick={() => navigate('/job')}>Explore jobs</button>
        </div>   
         )
}

export default ProtectedRoute(Home);
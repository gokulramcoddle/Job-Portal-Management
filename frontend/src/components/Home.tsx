import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
interface userlabel{
    username : {
      user: string;
    }
}
function Home(){
    const navigate = useNavigate();
    const username = useSelector((state: userlabel) => state.username.user)
    return(
        <div className='home'>
        <h1 >WELCOME TO JOBHUNT, {username}</h1>
         <button onClick={() => navigate('/job')}>Explore jobs</button>
        </div>   
         )
}

export default Home;
import { useNavigate } from "react-router-dom";

function Home(){
    const username = localStorage.getItem('username').toUpperCase();
    const Navigate = useNavigate();
   function handleClick(){
     localStorage.removeItem('token');
     Navigate('/login');
    }
    return(
        <>
        <h1>Welcome to Home -- {username}</h1>
        <button onClick={handleClick}>Logout</button>
        </>
    )
}

export default Home;
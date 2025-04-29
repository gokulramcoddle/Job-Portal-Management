import { Link, useNavigate } from 'react-router-dom';
function Header(){
     const navigate = useNavigate();
        function handleClick(){
          alert('Are you sure want to Logout?');
        localStorage.removeItem('token');
        navigate('/login');
  }
   return(
    <>
    <div className='nav'>
        <div className='nav-container container'>
        <h2>JOB PORTAL</h2>
      <ul className='nav-link'>
        <li><Link to="/Home" className="link">Home</Link></li>
        <li><Link to="/job" className="link">Jobs</Link></li>
        <li><Link to="/application" className="link">My Application</Link></li>
        <li><Link to="/about" className="link">About</Link></li>
        <li>User Name <button onClick={handleClick}>Logout</button></li>
      </ul>
      </div>
    </div>
    </>
   );
}

export default Header;
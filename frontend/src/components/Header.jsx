import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/images/jobportal-logo.png'
function Header(){
  const userName = useSelector((state) => state.username.user).toUpperCase();
     const navigate = useNavigate();
        function handleClick(){
          alert('Are you sure want to Logout?');
        localStorage.removeItem('token');
        navigate('/login');
        console.log(userName);
  }
   return(
    <div className='nav'>
       <div className='nav-container container'>
        <img src={ logo} alt="logo" />
        <ul className='nav-link'>
        <li><Link to="/home" className="link">HOME</Link></li>
        <li><Link to="/job" className="link">JOBS</Link></li>
        <li><Link to="/application" className="link">MY APPLICATION</Link></li>
        <li><Link to="/about" className="link">ABOUT</Link></li>
        <li><span className='username-label'>{userName}</span> <button onClick={handleClick}>LOG OUT</button></li>
      </ul>
      </div>
    </div>
   );
}

export default Header;
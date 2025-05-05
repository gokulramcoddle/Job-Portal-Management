import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header(){
  const userName = useSelector((state : any) => state.username.user).toUpperCase();
     const navigate = useNavigate();
     const notifyWithAction = () => {
      toast(
        ({ closeToast }) => (
          <div className='logout-toast'>
            <p>Are you sure you want to log out?</p>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
                toast.success('Logout successful');
                closeToast();
              }}
            >
              Yes
            </button>
            <button onClick={closeToast}>No</button>
          </div>
        ),
        { autoClose: false }
      );
    };
   return(
    <div className='nav'>
       <div className='nav-container container'>
        <img src="/images/header-logo.png" alt="logo" />
        <ul className='nav-link'>
        <li><Link to="/home" className="link">HOME</Link></li>
        <li><Link to="/job" className="link">JOBS</Link></li>
        <li><Link to="/application" className="link">MY APPLICATION</Link></li>
        <li><Link to="/about" className="link">ABOUT</Link></li>
        <li className='nav-user-logout'>
          <div className="user-label">
            <FontAwesomeIcon icon={faUser} className='usericon'/>
          <span>{userName}</span>
          </div>
          <button onClick={notifyWithAction}>LOG OUT</button>
        </li>
      </ul>
      </div>
    </div>
   );
}

export default Header;
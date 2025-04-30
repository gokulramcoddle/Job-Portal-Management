import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/images/footer-logo.png';

function Footer(){
    return(
         <footer>
            <div className="footer-con">
                <div className="footer-about">
                <img src={logo} alt="" />
                  <p>Job Hunt is your go-to platform for finding and applying to jobs with ease.
                     Our simple and user-friendly interface allows job seekers to explore opportunities and apply instantly through our "Easy Apply" feature.
                  </p>
                </div>
                <ul className='footer-link'>
                <h2>Quick Links</h2>
                <li><Link to="/Home" className="quicklink-ftr">Home</Link></li>
                <li><Link to="/job" className="quicklink-ftr">Jobs</Link></li>
                <li><Link to="/application" className="quicklink-ftr">My Application</Link></li>
                <li><Link to="/about" className="quicklink-ftr">About</Link></li>
                </ul>
                <ul className="social-link">
                    <h2>Follow us</h2>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faLinkedinIn} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faFacebook} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faInstagram} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faWhatsapp} /></Link></li>
                </ul>  
                <ul className="contact">
                     <h2>Contact</h2>
                    <li><FontAwesomeIcon icon={faHeadset} /> : 04632-21342</li>
                    <li><FontAwesomeIcon icon={faEnvelope} /> : jobhunt@gmail.com</li>
                </ul>
            </div>
            <p className='copyright-ftr'> © 2025 Job Portal All Rights Reserved </p>
         </footer>
    );
}

export default Footer;
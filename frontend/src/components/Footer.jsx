import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedinIn, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return(
         <footer>
            <div className="footer-con">
                <ul className="contact">
                    <li>Contact <FontAwesomeIcon icon={faHeadset} /> : 04632-21342</li>
                    <li>Mail <FontAwesomeIcon icon={faEnvelope} /> : jobportal@gmail.com</li>
                </ul>
                <p> © 2025 Job Portal All Rights Reserved </p>
                <ul className="socialLink">
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faLinkedinIn} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faFacebook} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faInstagram} /></Link></li>
                    <li><Link className='link-ftr'><FontAwesomeIcon icon={faWhatsapp} /></Link></li>
                </ul>
            </div>
         </footer>
    );
}

export default Footer;
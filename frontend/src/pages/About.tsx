import { ProtectedRoute } from '../components/ProtectedRoute';

function About(){
    return(
        <div className='about'>
        <h1>ABOUT</h1>
        <p>JobHunt is your trusted job portal designed to simplify your career search. Whether you're a fresh graduate or an experienced professional, JobHunt connects you with opportunities that match your skills and interests.</p>
        <h2>What We Do</h2>
        <p>At JobHunt, we believe job hunting shouldn't be complicated. That's why we’ve made the process simple:</p>
         <ul>
             <li>Browse through a wide variety of job listings from top companies.</li>
             <li>Just click "Apply", and your application will be posted instantly.</li>
             <li>Track your applications and never miss a chance.</li>
         </ul>
         <h2>Our Goal</h2>
          <p>Our mission is to bridge the gap between job seekers and employers by providing a fast, efficient, and user-friendly platform.</p>
          <p>Start your journey with JobHunt today — where opportunities find you!</p>
        </div>
    )
}

export default ProtectedRoute(About);
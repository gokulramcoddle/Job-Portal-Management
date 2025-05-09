import Layout from './Layout';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Job from '../pages/Job';
import Apply from './Apply';
import MyApplication from '../pages/MyApplication';
import About from '../pages/About';
import Home from '../pages/Home';
import { Navigate, Route, Routes} from 'react-router-dom';

export function AppRoutes(){
    return(
        <Routes>
        <Route element ={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/job' element= {<Job />} />
              <Route path='job/apply/:id' element = {<Apply />} />
              <Route path='/application' element = {<MyApplication />} />
              <Route path='/about' element= {<About />}/>
        </Route>
           <Route path = '/login' element = {<Login />} />
           <Route path='/signup' element = {<Signup />} />
           <Route path = '*' element ={<Navigate to = '/login'/>} />
      </Routes>
    );
}

export default AppRoutes;
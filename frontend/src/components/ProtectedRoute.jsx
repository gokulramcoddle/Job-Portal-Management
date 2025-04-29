import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
function ProtectedRoute(){
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to='/login'/>        
    }
return <Outlet/>
}

export default ProtectedRoute;
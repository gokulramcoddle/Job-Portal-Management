import { ProtectedRoute } from '../components/ProtectedRoute';

function About(){
    return(
        <h1>About</h1>
    )
}

export default ProtectedRoute(About);
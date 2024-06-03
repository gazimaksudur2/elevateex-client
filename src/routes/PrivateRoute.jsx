import { ClimbingBoxLoader } from 'react-spinners';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return <ClimbingBoxLoader color="#d65336" />
    }else if(user){
        return children;
    }
    return <Navigate to={'login'} state={{from:location}}></Navigate>
};

export default PrivateRoute;
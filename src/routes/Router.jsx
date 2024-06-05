import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import AllClasses from "../pages/AllClasses/AllClasses";
import TeachHere from "../pages/TeachHere/TeachHere";
import MainLayout from "../layout/MainLayout";
import Login from "../layout/Login";
import Register from "../layout/Register";
import ErrorPage from "../layout/ErrorPage";
import UserDashboard from "../layout/UserDashboard/UserDashboard";
import AdminDashboard from "../layout/AdminDashBoard/AdminDashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'allclass',
                element: <AllClasses/>
            },
            {
                path: 'teach',
                element: <TeachHere/>
            }
        ]
    },
    {
        path: 'userdash',
        element: <UserDashboard/>
    },
    {
        path: 'admindash',
        element: <AdminDashboard/>
    },
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'register',
        element: <Register/>
    }
]);

export default router;
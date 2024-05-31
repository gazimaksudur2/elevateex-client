import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";
import TeachHere from "../pages/TeachHere";
import MainLayout from "../layout/MainLayout";
import Login from "../layout/Login";
import Register from "../layout/Register";
import ErrorPage from "../layout/ErrorPage";

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
        path: 'login',
        element: <Login/>
    },
    {
        path: 'register',
        element: <Register/>
    }
]);

export default router;
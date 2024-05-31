import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllClasses from "../pages/AllClasses";
import TeachHere from "../pages/TeachHere";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
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
                path: 'teachHere',
                element: <TeachHere/>
            }
        ]
    }
]);

export default router;
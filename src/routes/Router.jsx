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
import TeacherRequests from "../layout/AdminDashBoard/TeacherRequests";
import CourseDetail from "../components/AllClasses/CourseDetail";
import StudentProfile from "../layout/UserDashboard/StudentProfile";
import MyEnrollments from "../layout/UserDashboard/MyEnrollments";
import EnrolledClassPage from "../layout/UserDashboard/EnrolledClassPage";
import TeacherDashboard from "../layout/TeacherDashboard/TeacherDashboard";
import Users from "../layout/AdminDashBoard/Users";
import AdminClasses from "../layout/AdminDashBoard/AdminClasses";
import AdminProfile from "../layout/AdminDashBoard/AdminProfile";
import TeacherProfile from "../layout/TeacherDashboard/TeacherProfile";
import TeacherClasses from "../layout/TeacherDashboard/TeacherClasses";
import AddClass from "../layout/TeacherDashboard/AddClass";
import SingleClass from "../layout/TeacherDashboard/SingleClass";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'allclass',
                element: <AllClasses />
            },
            {
                path: 'teach',
                element: <TeachHere />
            }
        ]
    },
    {
        path: 'course/:id',
        element: <CourseDetail />,
    },
    {
        path: 'userdash',
        element: <UserDashboard />,
        children: [
            {
                index: true,
                element: <StudentProfile />
            },
            {
                path: 'enrolled',
                element: <MyEnrollments />,
            },
            {
                path: 'classes/:id',
                element: <EnrolledClassPage />,
            }
        ]
    },
    {
        path: 'admindash',
        element: <AdminDashboard />,
        children: [
            {
                index: true,
                element: <AdminProfile/>,
            },
            {
                path: 'teacherreq',
                element: <TeacherRequests />,
            },
            {
                path: 'allusers',
                element: <Users/>,
            },
            {
                path: 'adminclasses',
                element: <AdminClasses/>
            }
        ]
    },
    {
        path: 'teacherdash',
        element: <TeacherDashboard />,
        children: [
            {
                index: true,
                element: <TeacherProfile/>,
            },
            {
                path: 'myclass',
                element: <TeacherClasses/>,
            },
            {
                path: 'addclass',
                element: <AddClass/>
            }
        ]
    },
    {
        path: '/teacherclass/:id',
        element: <SingleClass/>,
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    }
]);

export default router;
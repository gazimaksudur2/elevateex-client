import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../layout/ErrorPage";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
      <p className="text-sm text-surface-500 font-medium">Loading...</p>
    </div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const Home = lazy(() => import("../pages/Home/Home"));
const AllClasses = lazy(() => import("../pages/AllClasses/AllClasses"));
const TeachHere = lazy(() => import("../pages/TeachHere/TeachHere"));
const Login = lazy(() => import("../layout/Login"));
const Register = lazy(() => import("../layout/Register"));
const CourseDetail = lazy(() => import("../components/AllClasses/CourseDetail"));

const UserDashboard = lazy(() => import("../layout/UserDashboard/UserDashboard"));
const StudentProfile = lazy(() => import("../layout/UserDashboard/StudentProfile"));
const MyEnrollments = lazy(() => import("../layout/UserDashboard/MyEnrollments"));
const EnrolledClassPage = lazy(() => import("../layout/UserDashboard/EnrolledClassPage"));

const AdminDashboard = lazy(() => import("../layout/AdminDashBoard/AdminDashboard"));
const AdminProfile = lazy(() => import("../layout/AdminDashBoard/AdminProfile"));
const TeacherRequests = lazy(() => import("../layout/AdminDashBoard/TeacherRequests"));
const Users = lazy(() => import("../layout/AdminDashBoard/Users"));
const AdminClasses = lazy(() => import("../layout/AdminDashBoard/AdminClasses"));
const AdminSingleClass = lazy(() => import("../layout/AdminDashBoard/AdminSingleClass"));

const TeacherDashboard = lazy(() => import("../layout/TeacherDashboard/TeacherDashboard"));
const TeacherProfile = lazy(() => import("../layout/TeacherDashboard/TeacherProfile"));
const TeacherClasses = lazy(() => import("../layout/TeacherDashboard/TeacherClasses"));
const AddClass = lazy(() => import("../layout/TeacherDashboard/AddClass"));
const SingleClass = lazy(() => import("../layout/TeacherDashboard/SingleClass"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "allclass", element: withSuspense(AllClasses) },
      { path: "teach", element: withSuspense(TeachHere) },
    ],
  },
  {
    path: "course/:id",
    element: withSuspense(CourseDetail),
    errorElement: <ErrorPage />,
  },
  {
    path: "userdash",
    element: withSuspense(UserDashboard),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(StudentProfile) },
      { path: "enrolled", element: withSuspense(MyEnrollments) },
      { path: "classes/:id", element: withSuspense(EnrolledClassPage) },
    ],
  },
  {
    path: "admindash",
    element: withSuspense(AdminDashboard),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(AdminProfile) },
      { path: "teacherreq", element: withSuspense(TeacherRequests) },
      { path: "allusers", element: withSuspense(Users) },
      { path: "adminclasses", element: withSuspense(AdminClasses) },
    ],
  },
  {
    path: "class/:id",
    element: withSuspense(AdminSingleClass),
    errorElement: <ErrorPage />,
  },
  {
    path: "teacherdash",
    element: withSuspense(TeacherDashboard),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(TeacherProfile) },
      { path: "myclass", element: withSuspense(TeacherClasses) },
      { path: "addclass", element: withSuspense(AddClass) },
    ],
  },
  {
    path: "/teacherclass/:id",
    element: withSuspense(SingleClass),
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: withSuspense(Login),
  },
  {
    path: "register",
    element: withSuspense(Register),
  },
]);

export default router;

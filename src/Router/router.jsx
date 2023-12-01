import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Membership from "../Pages/Membership/Membership";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import Comments from "../Pages/Dashboard/Comments/Comments";
import Announcement from "../Pages/Dashboard/Announcement/Announcement";
import PostDetails from "../Pages/Home/PostDetails/PostDetails";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyPostTable from "../Pages/Dashboard/MyPostTable/MyPostTable";
import AnnouncementHome from "../Pages/Home/AnnouncementHome/AnnouncementHome";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/membership",
                element: <PrivateRoute><Membership></Membership></PrivateRoute> 
            },
            {
                path: "/announcement",
                element:<AnnouncementHome></AnnouncementHome>
            },
            {
                path: "/joinUs",
                element: <JoinUs></JoinUs>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/payment/success/:tran_id",
                element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>  
            },
            {
                path: "/posts/:id",
                element:  <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "addPost",
                element: <AddPost></AddPost>
            },
            {
                path: "myPost",
                element: <MyPost></MyPost>
            },
            {
                path: "myPostTable",
                element: <MyPostTable></MyPostTable>
            },
            {
                path: "posts/:id",
                element: <PostDetails></PostDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
            },
            // admin 
            {
                path: "adminProfile",
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: "manageUser",
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: "comments",
                element: <AdminRoute><Comments></Comments></AdminRoute>
            },
            {
                path: "announcement",
                element: <AdminRoute><Announcement></Announcement></AdminRoute>
            },
        ]
    },
]);

export default router;

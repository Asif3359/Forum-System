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
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/membership",
                element:<Membership></Membership>
            },
            {
                path:"/joinUs",
                element:<JoinUs></JoinUs>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
        ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"myProfile",
                element:<MyProfile></MyProfile>
            },
            {
                path:"addPost",
                element:<AddPost></AddPost>
            },
            {
                path:"myPost",
                element:<MyPost></MyPost>
            },
        ]
    },
]);

export default router;

import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import JoinUs from "../Pages/JoinUs/JoinUs";
import Membership from "../Pages/Membership/Membership";

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
        ]
    },
]);

export default router;

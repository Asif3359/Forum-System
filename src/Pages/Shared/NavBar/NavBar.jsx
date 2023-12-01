import { NavLink } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import useAuth from '../../../Hooks/useAuth';
import logo1 from "../../../assets/logo1.jpg"
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import React, { useEffect, useState } from 'react';

const NavBar = () => {

    const { user, logOut } = useAuth();


    const axiosPublic = useAxiosPublic();
    const [announcement, setAnnouncements] = useState([]);
    const [ourUser, setOurUser] = useState({});

    useEffect(() => {

        axiosPublic.get('/announcement')
            .then(res => {
                setAnnouncements(res.data)
            })
        axiosPublic.get(`/users/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setOurUser(res.data)
            })

    }, [user])

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    // "/dashboard/myProfile"
    const links = <>
        <li> <NavLink to="/">Home</NavLink></li>
        <li> <NavLink to="/membership">Membership</NavLink></li>
        <li > <NavLink to="/announcement"><FaBell />{announcement.length}</NavLink></li>
        {
            user ? <>
                <div className="dropdown dropdown-end ">
                    <label tabIndex={0} className="m-1 btn btn-circle "><img src={user?.photoURL} className='w-10  rounded-full' alt="" /></label>
                    <ul tabIndex={0} className=" md:dropdown-content md:z-[1] menu p-2 lg:shadow lg:bg-base-100 rounded-box lg:w-64 gap-1">
                        <div><h2 className='p-1 uppercase px-4'>{user?.displayName}</h2></div>
                        <li><NavLink to={ourUser?.role?"/dashboard/adminProfile":"/dashboard/myProfile"}>DashBoard</NavLink></li>
                        <li><button onClick={handleLogOut}>Logout</button></li>
                    </ul>
                </div>
            </> : <><li> <NavLink to="/joinUs">Join Us</NavLink></li></>
        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown border-2 rounded-xl">
                        <label tabIndex={0} className="btn btn-sm btn-ghost border-4 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className='hidden md:flex justify-start items-center gap-3'>
                        <img src={logo1} className='w-12 rounded-full border-2' alt="" />
                        <p>Something </p>
                    </div>
                </div>
                {/* <div className="navbar-center hidden lg:flex items-center">
                    <ul className="menu menu-horizontal px-1">

                    </ul>
                </div> */}
                <div className="navbar-end">
                    <ul className='menu menu-horizontal px-1 gap-2 hidden md:flex items-center'>
                        {
                            links
                        }
                    </ul>
                    <div className='flex md:hidden justify-start items-center gap-3'>
                        <p>Something </p>
                        <img src={logo1} className='w-12 rounded-full border-2' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
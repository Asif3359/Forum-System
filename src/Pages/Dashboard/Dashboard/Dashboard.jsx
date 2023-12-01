import React, { useEffect, useState } from 'react';
import { FaBell, FaFlag, FaHome, FaList, FaRegEdit, FaRegGem, FaTable, FaThLarge, FaUser, FaUserCog, FaUsersCog } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import logo1 from "../../../assets/logo1.jpg"
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Dashboard = () => {

    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();
    const [feedBack, setFeedback] = useState([])
    const [ourUser, setOurUser] = useState({})

    useEffect(() => {
        if (user?.email) {
            // console.log(user.email);

            axiosPublic.get(`/feedback/${user.email}`)
                .then(res => {
                    // console.log("Feedback", res.data)
                    setFeedback(res.data);
                })

            axiosPublic.get(`/users/${user.email}`)
                .then(res => {
                    // console.log(res.data)
                    setOurUser(res.data);
                })
        }

    }, [user])
    return (
        <div className="drawer md:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-3">
                {/* Page content here */}
                <div className='flex justify-between items-center'>
                    <div className='md:hidden'>
                        <h1>QnOption</h1>
                    </div>
                    <label htmlFor="my-drawer-2" className="btn  drawer-button md:hidden"><FaList /></label>
                </div>
                <div className='lg:px-10'>
                    <Outlet></Outlet>
                </div>


            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className='bg-base-200 min-h-full py-10 w-4/5 md:w-80'>
                    <div className='flex flex-col justify-start items-center gap-3'>
                        <img src={logo1} className='w-12 rounded-full border-2' alt="" />
                        <p className='font-bold text-2xl text-blue-500'>Connect </p>
                    </div>
                    <ul className="menu p-4  space-y-2   text-base-content">
                        {/* Sidebar content here */}
                        {
                            ourUser.role == "admin" ?
                                <>
                                    <li><NavLink to="/dashboard/adminProfile"> <span className='text-2xl mr-2'><FaUserCog /></span> Admin Profile</NavLink></li>
                                    <li><NavLink to="/dashboard/manageUser"> <span className='text-2xl mr-2'><FaUsersCog /></span> Manage Users</NavLink></li>
                                    <li><NavLink to="/dashboard/comments"> <span className='text-2xl mr-2'><FaFlag/></span> Reported Comments</NavLink></li>
                                    <li><NavLink to="/dashboard/announcement"> <span className='text-2xl mr-2'><FaBell /></span> Make Announcement</NavLink></li>
                                    <div className='divider'></div>
                                    <li><NavLink to="/dashboard/myProfile"> <span className='text-2xl mr-2'><FaUser /></span> My Profile <FaBell />{feedBack.length}</NavLink></li>
                                    <li><NavLink to="/dashboard/addPost"> <span className='text-2xl mr-2'><FaRegEdit /></span> Add Post</NavLink></li>
                                    <li><NavLink to="/dashboard/myPostTable"> <span className='text-2xl mr-2'><FaTable /></span> My Post Table</NavLink></li>
                                    <li><NavLink to="/dashboard/myPost"> <span className='text-2xl mr-2'><FaThLarge /></span> My Post</NavLink></li>
                                    <div className='divider'></div>
                                </>
                                :
                                <>
                                    <li><NavLink to="/dashboard/myProfile"><span className='text-2xl mr-2'><FaUser /></span> My Profile <FaBell />{feedBack.length}</NavLink></li>
                                    <li><NavLink to="/dashboard/addPost"> <span className='text-2xl mr-2'><FaRegEdit /></span> Add Post</NavLink></li>
                                    <li><NavLink to="/dashboard/myPostTable"><span className='text-2xl mr-2'><FaTable /></span> My Post Table</NavLink></li>
                                    <li><NavLink to="/dashboard/myPost"><span className='text-2xl mr-2'><FaThLarge /></span> My Post</NavLink></li>
                                    <div className='divider'></div>
                                </>
                        }
                        <li><NavLink to="/"> <span className='text-2xl mr-2'><FaHome /> </span> Home</NavLink></li>
                        <li><NavLink to="/membership"><span className='text-2xl mr-2'><FaRegGem /></span> Membership</NavLink></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
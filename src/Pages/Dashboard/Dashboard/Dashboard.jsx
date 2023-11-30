import React from 'react';
import { FaList } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import logo1 from "../../../assets/logo1.jpg"

const Dashboard = () => {
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
                <div className='px-10'>
                    <Outlet></Outlet>
                </div>


            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className='bg-base-200 min-h-full py-10 w-1/2 md:w-80'>
                    <div className='flex flex-col justify-start items-center gap-3'>
                        <img src={logo1} className='w-12 rounded-full border-2' alt="" />
                        <p>Something </p>
                    </div>
                    <ul className="menu p-4  space-y-2   text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/myProfile">My Profile</NavLink></li>
                        <li><NavLink to="/dashboard/addPost">Add Post</NavLink></li>
                        <li><NavLink to="/dashboard/myPostTable">My Post Table</NavLink></li>
                        <li><NavLink to="/dashboard/myPost">My Post</NavLink></li>
                        <div className='divider'></div>
                        <li><NavLink to="/dashboard/adminProfile">Admin Profile</NavLink></li>
                        <li><NavLink to="/dashboard/manageUser">Manage User</NavLink></li>
                        <li><NavLink to="/dashboard/comments">Reported Comments</NavLink></li>
                        <li><NavLink to="/dashboard/announcement">Make Announcement</NavLink></li>
                        <div className='divider'></div>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/membership">Membership</NavLink></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
    const [ourUsers, setOurUsers] = useState([]);
    const [totalPost, setTotalPost] = useState([]);
    const [TotalComment, setTotalComment] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                // console.log(res.data);
                setOurUsers(res.data);
            })

        axiosSecure.get('/totalPost')
            .then(res => {
                // console.log(res.data);
                setTotalPost(res.data);
            })

        axiosSecure.get('/comment')
            .then(res => {
                // console.log(res.data);
                setTotalComment(res.data);
            })
    }, []);
    return (
        <div>
            <div className='space-y-3'>
                <img src={user?.photoURL} className='w-48 rounded-full bg-base-300' alt="" />
                <h1 className='uppercase'>{user?.displayName}</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                <div className='bg-base-300 h-44 rounded-lg flex justify-center items-center'>
                    <h1><span className='text-2xl font-bold'>Total User: {ourUsers?.length}</span>  </h1>
                </div>
                <div className='bg-base-300 h-44 rounded-lg flex justify-center items-center'>
                    <h1><span className='text-2xl font-bold'>Total Posts: {totalPost?.length}</span>  </h1>
                </div>
                <div className='bg-base-300 h-44 rounded-lg flex justify-center items-center'>
                    <h1><span className='text-2xl font-bold'>Total Comment: {TotalComment?.length}</span>  </h1>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
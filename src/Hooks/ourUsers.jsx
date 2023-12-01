import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';

const ourUsers = () => {
    const { user } = useAuth();


    const axiosPublic = useAxiosPublic();
    const [ourUser, setOurUser] = useState({});

    useEffect(() => {

        axiosPublic.get(`/users/${user?.email}`)
            .then(res => {
                // console.log(res.data);
                setOurUser(res.data)
            })

    }, [user])
    
    return ourUser;
};

export default ourUsers;
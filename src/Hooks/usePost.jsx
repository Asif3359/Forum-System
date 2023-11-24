
// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePost = () => {
    const axiosPublic = useAxiosPublic();


    const {data: post = [], isPending: loading, refetch} = useQuery({
        queryKey: ['posts'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    })


    return [post, loading, refetch]
}

export default usePost;
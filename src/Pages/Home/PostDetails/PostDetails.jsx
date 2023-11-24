import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useLoaderData, useParams } from 'react-router-dom';
import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const PostDetails = () => {
    const post = useLoaderData();
    const { _id } = useParams();
    const [postInfo, setPostInfo] = useState({});
    const [upVote, setUpVote] = useState(post.upVote);

    const handleUpVote = (vote) => {
        if (vote == post.upVote) {
            setUpVote(vote + 1);
        }
        else{
            setUpVote(vote - 1);
        }


    }



    return (
        <div className='my-20 mx-10 p-5 rounded-lg border-2'>
            <div className="card w-full ">
                <div className="card-body space-y-4">
                    <h2 className="card-title gap-5">
                        <img src={post.authorImg} className='w-20 rounded-full' alt="" />
                        <div className="text-xl font-bold">{post.authorName}</div>
                    </h2>
                    <h1>{post.postTitle}</h1>
                    <p>{post.postDescription}</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start items-center gap-4'>
                            <button onClick={() => handleUpVote(upVote)} className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'><FaRegThumbsUp /></p>
                                <p >{upVote}</p>
                            </button>
                            <button className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'> <FaRegThumbsDown /></p>
                                <p>{post.downVote}</p>
                            </button>
                        </div>
                        <div>
                            <button className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'><FaCommentAlt /></p>
                                <p>{post.downVote}</p>
                            </button>
                        </div>
                    </div>
                    <div>
                        <textarea placeholder='write Your Comment hear. . .' className='w-full p-2 h-32 border-2 rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
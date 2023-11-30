import React from 'react';
import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Post = ({ item, location }) => {

    const { postTitle, authorName, authorImg, upVote, downVote, postTag, _id, postComments, postTime } = item;

    const datePart = postTime.split('T')[0];
    const timePart = postTime.split('T')[1].split('.')[0];
    const navigate = useNavigate();
    // to={`/posts/${_id}`}


    const handleNavigate = () => {
        if (location) {
            console.log("ok");
            navigate(`/dashBoard/posts/${_id}`)
        }
        else {
            navigate(`/posts/${_id}`)
        }
    }

    return (
        <div onClick={handleNavigate} className=' flex flex-col justify-between hover:cursor-pointer  border-2 p-4 rounded-lg space-y-4 w-full hover:bg-base-200 translate-x-10 hover:scale-105
        
        transition ease-in-out delay-100  hover:-translate-y-1  duration-200'>
            <div className='flex justify-start gap-4 items-center'>
                <img src={authorImg} alt="" className='w-16 rounded-full' />
                <h1 className='text-xl font-bold'>{authorName}</h1>
            </div>
            <div>
                <h1 className='text-2xl font-bold'>{postTitle}</h1>
                <h1 className='text-gray-500'>{postTag}</h1>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <div className="badge btn btn-ghost btn-xs  gap-2">
                        <FaRegThumbsUp />
                        <p>{upVote}</p>
                    </div>
                    <div className="badge btn btn-ghost btn-xs  gap-2">
                        <FaRegThumbsDown />
                        <p>{downVote}</p>
                    </div>
                </div>
                <div>
                    <div className="badge btn btn-ghost btn-xs  gap-2">
                        <FaCommentAlt />
                        <p>{postComments.length}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center '>
                <p>{timePart}</p>
                <p>{datePart}</p>
            </div>
        </div>
    );
};

export default Post;
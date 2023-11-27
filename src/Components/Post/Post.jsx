import React from 'react';
import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Post = ({ item }) => {

    const { postTitle, authorName, authorImg, upVote, downVote, postTag, _id, postComments, postTime } = item;

    const datePart = postTime.split('T')[0];
    const timePart = postTime.split('T')[1].split('.')[0];



    return (
        <Link to={`/posts/${_id}`} className='border-2 p-4 rounded-lg space-y-4 w-full'>
            <div className='flex justify-between items-center'>
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
        </Link>
    );
};

export default Post;
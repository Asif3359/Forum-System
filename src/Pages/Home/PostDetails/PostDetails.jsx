import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp, FaReply } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePost from '../../../Hooks/usePost';
import useAuth from '../../../Hooks/UseAuth';
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton } from 'react-share';

const PostDetails = () => {
    const postDetails = useLoaderData();
    const { id } = useParams();
    // const [postInfo, setPostInfo] = useState({});

    const [vote, setVote] = useState(false);
    const [vote1, setVote1] = useState(false);

    const [commentBox, setCommentBox] = useState(false);
    const [commentReplay, setCommentReplay] = useState(false);
    const [itemIndex, setItemIndex] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [post, loading, refetch] = usePost();
    // const [postDetail, isLoading, isRefetch] = usePostDetails(id);
    const [upVoteValue, setUpVoteValue] = useState(postDetails.upVote);
    const [downVoteValue, setDownVoteValue] = useState(postDetails.downVote);
    const [commentCount, setCommentCount] = useState(postDetails?.postComments?.length)
    const { user } = useAuth();
    const [seeLength, setSeeLength] = useState(3);
    const [startLength, setStartLength] = useState(0);



    const {
        _id,
        authorImg,
        authorName,
        authorEmail,
        postTitle,
        postDescription,
        postTag,
        postComments,
        upVote,
        downVote,
        postTime,
    } = postDetails;

    console.log(postComments);



    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const handleUpVote = (vote) => {
        setVote(vote);
        if (vote) {
            const updatePostInfo = {
                authorImg: authorImg,
                authorName: authorName,
                authorEmail: authorEmail,
                postTitle: postTitle,
                postDescription: postDescription,
                postTag: postTag,
                postComments: postComments,
                upVote: upVote + 1,
                downVote: downVote,
                postTime: postTime,
            }
            console.log(updatePostInfo);
            axiosSecure.put(`/posts/${id}`, updatePostInfo)
                .then(res => {
                    console.log(res.data);
                    setUpVoteValue(upVoteValue + 1)
                })
            if (loading) {
                refetch();
            }
        }
        else {
            const updatePostInfo = {
                authorImg: authorImg,
                authorName: authorName,
                authorEmail: authorEmail,
                postTitle: postTitle,
                postDescription: postDescription,
                postTag: postTag,
                postComments: postComments,
                upVote: upVote,
                downVote: downVote,
                postTime: postTime,
            };
            console.log(updatePostInfo);
            axiosSecure.put(`/posts/${id}`, updatePostInfo)
                .then(res => {
                    console.log(res.data);
                    setUpVoteValue(upVoteValue - 1)
                })
            if (loading) {
                refetch();
            }
        }
    }
    const handleDownVote = (vote) => {
        setVote1(vote);
        if (vote) {
            const updatePostInfo = {
                authorImg: authorImg,
                authorName: authorName,
                authorEmail: authorEmail,
                postTitle: postTitle,
                postDescription: postDescription,
                postTag: postTag,
                postComments: postComments,
                upVote: upVote,
                downVote: downVote + 1,
                postTime: postTime,
            }
            console.log(updatePostInfo);
            axiosSecure.put(`/posts/${id}`, updatePostInfo)
                .then(res => {
                    console.log(res.data);
                    setDownVoteValue(downVoteValue + 1)
                })
            if (loading) {
                refetch();
            }
        }
        else {
            const updatePostInfo = {
                authorImg: authorImg,
                authorName: authorName,
                authorEmail: authorEmail,
                postTitle: postTitle,
                postDescription: postDescription,
                postTag: postTag,
                postComments: postComments,
                upVote: upVote,
                downVote: downVote,
                postTime: postTime,
            };
            console.log(updatePostInfo);
            axiosSecure.put(`/posts/${id}`, updatePostInfo)
                .then(res => {
                    console.log(res.data);
                    setDownVoteValue(downVoteValue - 1)
                })
            if (loading) {
                refetch();
            }
        }
    }
    const handleComment = (commentBox) => {
        setCommentBox(commentBox);
    }

    const onSubmit = (data) => {
        console.log(data);
        const commentPost = data.comment;
        const commentId = postComments.length;
        const commentsReplay = [];
        const commentUser = {
            commentMail: user.email,
            commentName: user.displayName,
            commentUserPhoto: user.photoURL
        };
        const updatePostInfo = {
            authorImg: authorImg,
            authorName: authorName,
            authorEmail: authorEmail,
            postTitle: postTitle,
            postDescription: postDescription,
            postTag: postTag,
            postComments: { commentPost, commentId, commentsReplay, commentUser },
            upVote: upVote,
            downVote: downVote,
            postTime: postTime,
        };
        console.log(updatePostInfo);
        axiosSecure.patch(`/posts/${id}`, updatePostInfo)
            .then(res => {
                console.log(res.data);
                setCommentCount(commentCount + 1);
            })
        if (!loading) {
            refetch();
        }

        reset();

    }

    const handleCommentReplay = (commentReplay, id) => {
        setCommentReplay(commentReplay);
        setItemIndex(id);
        // console.log(id);
    }


    const handleSeeMoreComment = (startLength, seeComment) => {
        setStartLength(seeComment)
        setSeeLength(seeComment + 3)
    }
    const handleSeeLessComment = (startLength, seeComment) => {
        setStartLength(startLength - 3)
        setSeeLength(seeComment - 3)
    }

    const handleReplay = (event, item) => {
        event.preventDefault();
        const from = event.target;
        const commentReplay = from.commentReplay.value;
        // console.log(commentReplay)

        const replaysId = postComments[item.commentId]?.commentsReplay?.length;


        const commentReplayUser = {
            replayUser: user.email,
            replayName: user.displayName,
            replayPhoto: user.photoURL
        };

        const updatePostInfo = {
            authorImg: authorImg,
            authorName: authorName,
            authorEmail: authorEmail,
            postTitle: postTitle,
            postDescription: postDescription,
            postTag: postTag,
            postComments: {
                commentPost: postComments[item.commentId].commentPost,
                commentId: postComments[item.commentId].commentId,
                commentsReplay: { commentReplay, commentReplayUser, replaysId },
                commentUser: postComments[item.commentId].commentUser,
            },
            upVote: upVote,
            downVote: downVote,
            postTime: postTime,
        };
        console.log(updatePostInfo);
        axiosSecure.patch(`/posts/${id}/${item.commentId}/${replaysId}`, updatePostInfo)
            .then(res => {
                console.log(res.data);
                setCommentCount(commentCount + 1);
            })
        if (!loading) {
            refetch();
        }

        reset();
    }

    // console.log(commentsReplay);
    const shareUrl = window.location.href
    console.log(shareUrl);


    return (
        <div className='my-20 mx-10 p-2 rounded-lg border-2'>
            <div className="card w-full ">
                <div className="card-body space-y-4">
                    <h2 className="card-title gap-5">
                        <img src={authorImg} className='w-20 rounded-full' alt="" />
                        <div className="text-xl font-bold">{authorName}</div>
                    </h2>
                    <h1>{postTitle}</h1>
                    <p>{postDescription}</p>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start items-center gap-4'>
                            <button onClick={() => handleUpVote(!vote)} className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'><FaRegThumbsUp /></p>
                                <p >{upVoteValue}</p>
                            </button>
                            <button onClick={() => handleDownVote(!vote1)} className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'> <FaRegThumbsDown /></p>
                                <p>{downVoteValue}</p>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => handleComment(!commentBox)} className=" flex btn btn-ghost btn-sm  gap-2">
                                <p className='text-2xl'><FaCommentAlt /></p>
                                <p>{commentCount}</p>
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='relative ml-2'>
                        {
                            commentBox ? <>
                                <textarea {...register("comment")} id='postComment' placeholder='write Your Comment hear. . .' className='w-full ml-2 p-2 h-32 border-2 rounded-lg' />
                                <div className='absolute right-0 bottom-5 mr-4'>
                                    <input type='submit' value="Send" className='btn btn-sm btn-ghost  ' />
                                </div>
                            </>
                                :
                                <></>
                        }
                    </form>
                    <div className='grid grid-cols-1 gap-5'>
                        {
                            postComments.slice(startLength, seeLength).map((item, index) =>
                                <div key={index}>
                                    <div className='border-2 p-2 ml-4 rounded-md'>
                                        <div className='flex justify-start items-center gap-3 mb-3'>
                                            <img src={item?.commentUser?.commentUserPhoto} className='w-8 rounded-full' alt="" />
                                            <p className='mb-2 font-bold'>{item?.commentUser?.commentName}</p>
                                        </div>
                                        <div>
                                            <div className='flex justify-between items-center gap-3'>
                                                <div className='flex-1'>
                                                    <p className='ml-3'>{item.commentPost}</p>
                                                </div>
                                                <button onClick={() => handleCommentReplay(!commentReplay, index)} className=" flex btn btn-ghost btn-sm  gap-2">
                                                    <p className='text-2xl'><FaReply /></p>
                                                    <p>{item?.commentsReplay?.length}</p>
                                                </button>
                                            </div>
                                            <div>
                                                <div className='ml-5 '>
                                                    {
                                                        commentReplay && itemIndex == index ?
                                                            <div className='grid grid-cols-1 gap-6 mb-3'>
                                                                {
                                                                    item?.commentsReplay?.map((comment, index) => <div className='border p-2 rounded-md' key={index}>
                                                                        <div className='flex justify-start items-center gap-2 '>
                                                                            <img src={comment?.commentReplayUser?.replayPhoto} className='w-8 rounded-full' alt="" />
                                                                            <p className='font-bold text-sm'>{comment?.commentReplayUser?.replayName}</p>
                                                                        </div>
                                                                        <p className='ml-10 '>{comment?.commentReplay}</p>
                                                                    </div>)
                                                                }
                                                            </div>
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                                <form className='relative ml-2' onSubmit={() => handleReplay(event, item)}>
                                                    {
                                                        commentReplay && itemIndex == index ?
                                                            <>
                                                                <textarea id={item.index} name='commentReplay' placeholder='write Your Comment hear. . .' className='w-full ml-2 p-2 h-20 border-2 rounded-lg' />
                                                                <div className='absolute right-0 bottom-5 mr-4'>
                                                                    <input type='submit' value="Send" className='btn btn-sm btn-ghost  ' />
                                                                </div>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                    <div className='flex gap-3 justify-between items-center'>
                        <div className=' flex-1 flex gap-3 justify-start items-center '>
                            <div>
                                <button onClick={() => handleSeeMoreComment(startLength, seeLength)} className='btn btn-sm '>See More Comment</button>
                            </div>
                            <div>
                                <button onClick={() => handleSeeLessComment(startLength, seeLength)} className='btn btn-sm '>See Less Comment</button>
                            </div>
                        </div>
                        <div className=' flex  items-center gap-4'>
                            <div className="Demo__some-network">
                                <FacebookShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <div>
                                    <FacebookShareCount
                                        url={shareUrl}
                                        className="Demo__some-network__share-count"
                                    >
                                        {(count) => count}
                                    </FacebookShareCount>
                                </div>
                            </div>
                            <div className="Demo__some-network">
                                <LinkedinShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostDetails;
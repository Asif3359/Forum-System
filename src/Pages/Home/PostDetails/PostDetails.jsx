import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { FaCommentAlt, FaExclamation, FaRegThumbsDown, FaRegThumbsUp, FaReply } from 'react-icons/fa';
import { useForm } from "react-hook-form"
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePost from '../../../Hooks/usePost';
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton } from 'react-share';
import useAuth from '../../../Hooks/useAuth';

const PostDetails = () => {
    const postDetails2 = useLoaderData();
    const [postDetails, setPostDetails] = useState(postDetails2);
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
    const [commentReplayCount, setCommentReplayCount] = useState(0);



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
                // console.log(res.data);
                setCommentCount(commentCount + 1);
                if (res.data.modifiedCount > 0) {
                    axiosSecure.get(`/posts/${id}`)
                        .then(res => {
                            // console.log(res.data);
                            setPostDetails(res.data);
                            reset();
                        })
                }
            })
        const postId = _id;
        const postInfo = {
            authorImg,
            authorName,
            authorEmail,
            postTitle,
            postDescription,
            postTag,
        }
        const commentInfo = {
            commentUser,
            postId,
            postInfo,
            commentPost

        }
        axiosSecure.post('/comment', commentInfo)
            .then(res => {
                console.log(res.data);
            })


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
                setCommentReplayCount(item?.commentsReplay?.length + 1);
                from.reset();
                if (res.data.modifiedCount > 0) {
                    axiosSecure.get(`/posts/${id}`)
                        .then(res => {
                            console.log(res.data);
                            setPostDetails(res.data);
                        })
                }

            })




    }

    // console.log(commentsReplay);
    const shareUrl = window.location.href
    const handleReport = (event, item) => {

        const reportReason = event.target.report.value;
        const commentPost = item.commentPost
        const commentId = item.commentId
        const commentUser = item.commentUser
        const byReportUser = user.displayName
        const byReportEmail = user.email
        const byReportPhoto = user.photoURL

        const reportUser = {
            byReportUser,
            byReportEmail,
            byReportPhoto
        }

        const reportsInfo = {
            commentPost,
            commentId,
            commentUser,
            reportReason,
            reportUser

        }
        if (reportReason.length >= 5 && reportReason !== "") {
            axiosSecure.post('/reports', reportsInfo)
                .then(res => {
                    console.log(res.data)
                    // console.log(reportsInfo)
                })
        }

    }




    return (
        <div className=' mx-3 my-10 lg:my-20 lg:mx-10 p-2 rounded-lg border-2'>
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
                                <textarea {...register("comment")} id='postComment' placeholder='write Your Comment hear. . .' className='w-full ml-2 pr-10 p-2 h-32 border-2 rounded-lg' />
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
                            postComments.slice().reverse().map((item, index) =>
                                <div key={index}>
                                    <div className='border-2 p-2  rounded-md'>
                                        <div className="flex justify-between items-center mb-3 space-y-3 ">
                                            <div className='flex justify-start items-center gap-3 '>
                                                <img src={item?.commentUser?.commentUserPhoto} className='w-8 rounded-full' alt="" />
                                                <p className='mb-2 font-bold'>{item?.commentUser?.commentName}</p>
                                            </div>
                                            <div>
                                                <button className='btn btn-sm btn-ghost' onClick={() => { document.getElementById(`comment${index}`).showModal() }} > < FaExclamation /></button>
                                            </div>
                                            <dialog id={`comment${index}`} className="modal">
                                                <div className="modal-box">
                                                    <div className="modal-action block ">
                                                        <form onSubmit={() => handleReport(event, item)} className='ml-0 space-y-2' method="dialog">
                                                            <p className='mb-2 '>Write You Issue</p>
                                                            <input name='report' type="text" className='p-2 w-full border-2 rounded-md' placeholder='Please provide some reason at least 5' />
                                                            <div className='flex justify-between items-center'>
                                                                <button className="btn btn-sm mt-2">
                                                                    <input type="button" value="Submit" />
                                                                </button>
                                                                <button className="btn btn-sm mt-2">close</button>
                                                            </div>
                                                        </form>

                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                        <div>
                                            <div className='flex justify-between items-center gap-3'>
                                                <div className='flex-1'>
                                                    {
                                                        item.commentPost.length < 200 ? <> <p className='ml-3'>{item.commentPost} </p></> :
                                                            <> <p className='ml-3'>{item.commentPost.slice(0, 200)}<span onClick={() => document.getElementById(item.commentId).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                                    }

                                                </div>
                                                <dialog id={item.commentId} className="modal">
                                                    <div className="modal-box">
                                                        <img src={item?.commentUser?.commentUserPhoto} className='w-8 rounded-full' alt="" />
                                                        <p className="py-4">{item.commentPost}</p>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
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
                                                                    item?.commentsReplay?.slice().reverse().map((comment, index) => <div className='border p-2 rounded-md' key={index}>
                                                                        <div className='flex justify-between items-center '>
                                                                            <div className='flex justify-start items-center gap-2 '>
                                                                                <img src={comment?.commentReplayUser?.replayPhoto} className='w-8 rounded-full' alt="" />
                                                                                <p className='font-bold text-sm'>{comment?.commentReplayUser?.replayName}</p>
                                                                            </div>
                                                                            <div>
                                                                                <div>
                                                                                    <button className='btn btn-sm btn-ghost' onClick={() => { document.getElementById(`commentReplay${index}`).showModal() }} > < FaExclamation /></button>
                                                                                </div>
                                                                            </div>
                                                                            <dialog id={`commentReplay${index}`} className="modal">
                                                                                <div className="modal-box">
                                                                                    <div className="modal-action block ">
                                                                                        <form onSubmit={() => handleReport(event, item)} className='ml-0 space-y-2' method="dialog">
                                                                                            <p className='mb-2 '>FeedBack</p>
                                                                                            <input name='report' type="text" className='p-2 w-full border-2 rounded-md' placeholder='Please provide some reason at least 5' />
                                                                                            <div className='flex justify-between items-center'>
                                                                                                <button className="btn btn-sm mt-2">
                                                                                                    <input type="button" value="Submit" />
                                                                                                </button>
                                                                                                <button className="btn btn-sm mt-2">close</button>
                                                                                            </div>
                                                                                        </form>

                                                                                    </div>
                                                                                </div>
                                                                            </dialog>
                                                                        </div>
                                                                        {
                                                                            comment?.commentReplay?.length < 200 ? <> <p className='ml-3'>{comment?.commentReplay} </p></> :
                                                                                <> <p className='ml-3'>{comment?.commentReplay.slice(0, 200)}<span onClick={() => document.getElementById(`Comment${comment.replaysId}`).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                                                        }
                                                                        <dialog id={`Comment${comment.replaysId}`} className="modal">
                                                                            <div className="modal-box">
                                                                                <img src={comment?.commentReplayUser?.replayPhoto} className='w-8 rounded-full' alt="" />
                                                                                <p className="py-4">{comment?.commentReplay}</p>
                                                                                <div className="modal-action">
                                                                                    <form method="dialog">
                                                                                        {/* if there is a button in form, it will close the modal */}
                                                                                        <button className="btn">Close</button>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        </dialog>
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
                                                                <textarea id={item.index} name='commentReplay' placeholder='write Your Comment hear. . .' className='w-full ml-2 p-2 pr-10  h-20 border-2 rounded-lg' />
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
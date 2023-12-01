import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaRegCommentDots, FaTrashAlt } from 'react-icons/fa';

const Comments = () => {
    const axiosSecure = useAxiosSecure();
    const [allReports, setAllReports] = useState([]);

    useEffect(() => {
        axiosSecure.get('/reports')
            .then(res => {
                console.log(res.data);
                setAllReports(res.data);
            })
    }, []);



    const handleFeedback = (event, item) => {

        const feedbackComment = event.target.feedback.value;
        const reportOnEmail = item.commentUser.commentMail

        const feedbackInfo = {
            item,
            feedbackComment,
            reportOnEmail

        }

        if (feedbackComment.length >= 5 && feedbackComment !== "") {
            axiosSecure.post('/feedback', feedbackInfo)
                .then(res => {
                    console.log(res.data)
                    // console.log(reportsInfo)
                })
        }
    }

    return (
        <div className='mt-4'>
            <div className="flex justify-evenly my-4 mb-5">
                <h2 className="text-3xl">All Reports</h2>
                <h2 className="text-3xl">Total Reports: {allReports.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th>Reason</th>
                            <th>Report On</th>
                            <th>Reported By</th>
                            <th>FeedBack</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allReports.slice().reverse().map((item, index) => <tr key={item.commentId}>
                                <td>{
                                    item?.commentPost?.length < 20 ? <> <p className='ml-3'>{item.commentPost} </p></> :
                                        <> <p className='ml-3'>{item?.commentPost?.slice(0, 20)}<span onClick={() => document.getElementById(`reports${item.commentId}`).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                }
                                    <dialog id={`reports${item.commentId}`} className="modal">
                                        <div className="modal-box max-w-6xl">
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
                                </td>
                                <td>{
                                    item.reportReason.length < 20 ? <> <p className='ml-3'>{item.reportReason} </p></> :
                                        <> <p className='ml-3'>{item.reportReason.slice(0, 20)}<span onClick={() => document.getElementById(`reportReason${item.commentId}`).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                }
                                    <dialog id={`reportReason${item.commentId}`} className="modal">
                                        <div className="modal-box max-w-6xl">
                                            <img src={item?.reportUser?.byReportPhoto} className='w-8 rounded-full' alt="" />
                                            <p className="py-4">{item.reportReason}</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                {/* <td>{item.reportReason}</td> */}
                                <td>{item.commentUser.commentMail}</td>
                                <td>{item.reportUser?.byReportEmail}</td>
                                <td>
                                    {/* <button
                                        onClick={() => handleFeedback(item)}
                                        className="btn btn-ghost btn-sm text-2xl">
                                        <FaRegCommentDots />
                                    </button> */}
                                    <div>
                                        <button className='btn btn-sm btn-ghost text-2xl' onClick={() => { document.getElementById(`feedback${index}`).showModal() }} ><FaRegCommentDots /></button>
                                    </div>
                                    <dialog id={`feedback${index}`} className="modal">
                                        <div className="modal-box">
                                            <div className="modal-action block ">
                                                <form onSubmit={() => handleFeedback(event, item)} className='ml-0 space-y-2' method="dialog">
                                                    <p className='mb-2 '>FeedBack</p>
                                                    <input name='feedback' type="text" className='p-2 w-full border-2 rounded-md' placeholder='Please provide Feedback' />
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
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* {
                allReports.slice().reverse().map((item, index) => <div key={item._id}>
                    h1
                </div>)
            } */}
        </div>


    );
};

export default Comments;


// {
//     user.role === 'admin' ? 'Admin' : <button
//         onClick={() => handleMakeAdmin(user)}
//         className="btn btn-sm bg-orange-500">
//         <FaUsers className="text-white
//                                         text-2xl"></FaUsers>
//     </button>
// }
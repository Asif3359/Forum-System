import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaRegCommentDots } from 'react-icons/fa';

const UsersFeedbacks = () => {
    const axiosSecure = useAxiosSecure();
    const [allFeedBack, setAllFeedBack] = useState([]);

    useEffect(() => {
        axiosSecure.get('/usersFeedback')
            .then(res => {
                console.log(res.data);
                setAllFeedBack(res.data);
            }
            )
    }, []);



    const handleFeedBack = (event, item) => {

        const freedBackReplay = event.target.feedback.value;
        const fedEamil= item.email

        const feedbackInfo = {
            item,
            freedBackReplay,
            fedEamil

        }

        if (freedBackReplay.length >= 5 && freedBackReplay !== "") {
            axiosSecure.post('/feedbackReplay', feedbackInfo)
                .then(res => {
                    console.log(res.data)
                    // console.log(reportsInfo)
                })
        }
    }

    return (
        <div className='mt-4'>
            <div className="flex justify-evenly my-4 mb-5">
                <h2 className="text-3xl">All Feed Backs</h2>
                <h2 className="text-3xl">Total Feedback:{allFeedBack.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allFeedBack.map((item, index) => <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{
                                    item?.message?.length < 20 ? <> <p className='ml-3'>{item.message} </p></> :
                                        <> <p className='ml-3'>{item?.message?.slice(0, 20)}<span onClick={() => document.getElementById(`reports${item._id}`).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                }
                                    <dialog id={`reports${item.commentId}`} className="modal">
                                        <div className="modal-box max-w-6xl">
                                            <img src={item?.commentUser?.commentUserPhoto} className='w-8 rounded-full' alt="" />
                                            <p className="py-4">{item.message}</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td>
                                    <div>
                                        <button className='btn btn-sm btn-ghost text-2xl' onClick={() => { document.getElementById(`feedback${index}`).showModal() }} ><FaRegCommentDots /></button>
                                    </div>
                                    <dialog id={`feedback${index}`} className="modal">
                                        <div className="modal-box">
                                            <div className="modal-action block ">
                                                <form onSubmit={() => handleFeedBack(event, item)} className='ml-0 space-y-2' method="dialog">
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
        </div>


    );
};

export default UsersFeedbacks;
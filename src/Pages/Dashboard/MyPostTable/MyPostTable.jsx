import useAuth from '../../../Hooks/useAuth';
import Post from '../../../Components/Post/post';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import usePost from '../../../Hooks/usePost';
import { useEffect, useState } from 'react';
import { FaCommentAlt, FaTrashAlt, FaUsers } from 'react-icons/fa';

const MyPostTable = () => {

    const [post, ,] = usePost()
    const axiosSecure = useAxiosSecure();
    const [userPost, setUserPost] = useState([]);
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/posts?&email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    setUserPost(data.result);

                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    // Handle the error (e.g., set an error state)
                });
        }
    }, [user]);

    const handleDeleteUser = (id) => {
        axiosSecure.delete(`/posts/${id}?&email=${user.email} `)
            .then(res => {
                console.log(res.data);
                const updatedPosts = userPost.filter((post) => post._id !== id);

                // Update the state with the filtered array
                setUserPost(updatedPosts);
            })

    }
    const handleComment = (id) => {
        navigate(`/dashBoard/posts/${id}`)
    }

    return (
        <div className='mt-5'>
            <div>
                <div className="flex justify-evenly my-4">
                    <h2 className="text-3xl">All Users</h2>
                    <h2 className="text-3xl">Total Users: {userPost.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Up Vote</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userPost.map((item, index) => <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.postTitle}</td>
                                    <td>{item.upVote}</td>
                                    <td>
                                        <button onClick={() => handleComment(item._id)} className='btn btn-sm '><FaCommentAlt />{item.postComments.length} </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(item._id)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPostTable;

// onClick={() => handleMakeAdmin(user)}
// 
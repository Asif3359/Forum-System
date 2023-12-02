import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { toast } from 'react-toastify';
import ourUsers from "../../../Hooks/ourUsers";
import usePost from "../../../Hooks/usePost";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Membership from "../../Membership/Membership";
import PrivateRoute from "../../../Router/privateRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {

    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const ourUser = ourUsers();
    const axiosSecure = useAxiosSecure();
    const [userPosts, setUserPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    // console.log(ourUser.email);

    useEffect(() => {
        axiosPublic.get(`/usersPosts/${ourUser.email}`)
            .then(res => {
                setUserPosts(res.data);
                // console.log(res.data.length)
                if (ourUser?.badgeType == 'Bronze' && res.data.length < 5) {
                    setPostLimit(true);
                }
                else if (ourUser.badgeType == 'diamond' && res.data.length < 50) {
                    setPostLimit(true);
                }
                else if (ourUser.badgeType == 'gold' && res.data.length < 100) {
                    setPostLimit(true);
                }
            })
    }, [ourUser, postLimit])

    const onSubmit = (data) => {
        const postTime = new Date();
        // console.log(data)
        const postInfo = {
            authorImg: user.photoURL,
            authorName: user.displayName,
            authorEmail: user.email,
            postTitle: data.title,
            postDescription: data.description,
            postTag: data.tag,
            postComments: [],
            upVote: (0),
            downVote: (0),
            postTime: postTime
        }
        // console.log(postInfo);

        const limit = userPosts.length;
        const badgeType = ourUser.badgeType;
        if (postLimit) {
            axiosPublic.post(`/posts/${limit}/${badgeType}`, postInfo)
                .then(res => {
                    if (res?.data?.result?.acknowledged) {
                        toast.success(' Post Successfully Done', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        reset();
                        setPostLimit(false);
                    }

                    if (res.data.error == "200") {
                        navigate('/memberShip');
                    }
                })
        }

        // console.log(user.email)
    }

    console.log(postLimit)



    return (
        <div>
            {
                postLimit ?
                    <>
                        <div className="mt-10 mb-10">
                            <h1 className="text-4xl">Add Your Post</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex flex-col gap-2  ">
                                <select required {...register("tag", { required: true })} className=" border rounded-lg p-2">
                                    <option value="">Default</option>
                                    <option value="tag1">tag-1</option>
                                    <option value="tag2">tag-2</option>
                                    <option value="tag3">tag-3</option>
                                    <option value="tag4">tag-4</option>
                                    <option value="tag5">tag-5</option>
                                </select>
                                {errors.tag && <span>This field is required</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor='title'>Title</label>
                                <input id='title' type="text" required  {...register("title", { required: true })} className="border rounded-lg p-2" placeholder="title" />
                                {errors.title && <span>This field is required</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor='description'>Description</label>
                                <textarea required type="text" {...register("description", { required: true })} className="border rounded-lg p-2 h-40" placeholder="Description" />
                                {errors.description && <span>This field is required</span>}
                            </div>
                            <input className="btn btn-sm w-full" type="submit" />
                        </form>
                    </> :
                    <>
                        <PrivateRoute><Membership></Membership></PrivateRoute>
                    </>
            }
        </div>
    );
};

export default AddPost;

{/**/ }
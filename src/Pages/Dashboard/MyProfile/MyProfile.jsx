import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Post from "../../../Components/Post/post";
import { useLocation } from "react-router-dom";

const MyProfile = () => {
    const [resentPost, setResentPost] = useState({});

    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [ourUser, setOurUser] = useState({});
    const location = useLocation();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/posts?&email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setResentPost(data.result);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    // Handle the error (e.g., set an error state)
                });

            axiosPublic.get(`/users/${user.email}`)
                .then(res => {
                    console.log(res.data)
                    setOurUser(res.data);
                })
        }
    }, [user]);


    return (
        <div className="mt-5 space-y-10 mr-5 ">
            <div className="space-y-3">
                <div>
                    <img src={user?.photoURL} className="w-48 rounded-full" alt="" />
                </div>
                <div>
                    <h1 className="uppercase">{ourUser?.name}</h1>
                    <h1 className="">{ourUser?.email}</h1>
                    <h1 className="">Badge: {ourUser?.badgeType}</h1>
                </div>
            </div>
            <div className="text-center ">
                <h1 className="text-3xl font-bold"> Recent Post</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    Array.isArray(resentPost) ? (
                        resentPost.slice(0, 3).map(item => (
                            <Post   key={item._id} item={item} location={location}></Post>
                        ))
                    ) : (
                        <p>Loading...</p> // You can add a loading indicator
                    )
                }
            </div>
        </div>
    );
};

export default MyProfile;

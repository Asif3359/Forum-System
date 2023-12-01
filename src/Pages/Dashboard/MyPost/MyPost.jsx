import React, { useEffect, useState } from 'react';
import usePost from '../../../Hooks/usePost';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Post from '../../../Components/Post/post';
import { useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const MyPost = () => {
    const [post, ,] = usePost()
    const axiosSecure = useAxiosSecure();
    const [userPost, setUserPost] = useState([]);
    const { user } = useAuth();
    const location = useLocation();
    const [limit = 5, setLimit] = useState();
    const [currentPage = 1, setCurrentPage] = useState();
    const movies = React.useRef(null);
    const [pageCount, setPageCount] = useState(5);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://blood-donation-server-beta.vercel.app/posts?page=${currentPage}&limit=${limit}&email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPageCount(data.pageCount)
                    setUserPost(data.result);

                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    // Handle the error (e.g., set an error state)
                });
        }
    }, [user]);

    const handlePageClick = (e) => {
        // console.log(e);
        setCurrentPage(e.selected + 1)
        movies.current = e.selected + 1

        axiosSecure.get(`/posts?page=${e.selected + 1}&limit=${limit}&email=${user.email}`)
            .then(res => {
                setUserPost(res.data.result);
            });
    }

    return (
        <div className='mt-4 space-y-10 pr-10'>
            <div>
                <h1 className='uppercase font-bold text-4xl'>My All Post</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
                {
                    userPost.map((item, index) =>
                        <Post location={location} item={item} key={item._id}></Post>)
                }
            </div>
            <div className='flex justify-center mt-4 mb-4'>
                <ReactPaginate
                    className='flex gap-10 border p-5 rounded-lg  paigaination'
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={handlePageClick}
                    breakClassName="page-item"
                    breakLinkClassName="page-link"


                    marginPagesDisplayed={2}

                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"


                />
            </div>
        </div>
    );
};

export default MyPost;
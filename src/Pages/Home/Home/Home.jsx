import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import usePost from '../../../Hooks/usePost';
import Post from '../../../Components/Post/post';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import ReactPaginate from 'react-paginate';
import './Home.css'

const Home = () => {
    const [post, loading, refetch] = usePost();
    const axiosPublic = useAxiosPublic();
    console.log(post)
    const [postData, setPostData] = useState([]);
    const [searchType, setSearchType] = useState('normal');
    const [pageCount, setPageCount] = useState(5);
    const [limit = 5, setLimit] = useState();
    const [currentPage = 1, setCurrentPage] = useState();
    const movies = React.useRef(null);

    useEffect(() => {
        movies.current=1;
        // Fetch data when the component mounts or when searchType changes
        const apiUrl = searchType === 'popular' ? '/popular' : '/posts';
        axiosPublic.get(`${apiUrl}?page=${currentPage}&limit=${limit}`)
            .then(res => {
                console.log(res.data.pageCount)
                setPageCount(res.data.pageCount)
                setPostData(res.data.result);
            });
    }, [searchType]);

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handlePageClick = (e) => {
        console.log(e);
        setCurrentPage(e.selected + 1)
        movies.current=e.selected+1
        const apiUrl = searchType === 'popular' ? '/popular' : '/posts';
        axiosPublic.get(`${apiUrl}?page=${e.selected+1}&limit=${limit}`)
            .then(res => {
                console.log(res.data.result)
                setPostData(res.data.result);
            });
    }

    return (
        <div className='space-y-10 mb-10'>
            <div>
                <Banner></Banner>
            </div>
            <div className='mt-10 px-1 space-y-10'>
                <div className='flex justify-between items-center '>
                    <div className='w-3/4'>
                        <label htmlFor="searchType" className="block text-sm font-medium text-gray-700">
                            Select Search Type:
                        </label>
                        <select
                            id="searchType"
                            name="searchType"
                            value={searchType}
                            onChange={handleSearchTypeChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="normal">Normal Search</option>
                            <option value="popular">Popular Search</option>
                        </select>
                    </div>
                    <div className='w-1/4'>
                        <p className='font-bold'>Announcement</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, quibusdam.</p>
                    </div>
                </div>
                <div className='block md:flex flex-row-reverse justify-between items-start  gap-3'>
                    {/* ... other code ... */}
                    <div className=' flex-1 space-y-3'>
                        <div>
                            <h1 className='text-center text-2xl font-bold' >All Posts</h1>
                        </div>
                        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {postData.map((item, index) => (
                                <Post key={item._id} item={item}></Post>
                            ))}
                        </div>
                    </div>
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

        </div>
    );
};

export default Home;




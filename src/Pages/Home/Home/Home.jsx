import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import usePost from '../../../Hooks/usePost';
import Post from '../../../Components/Post/post';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import ReactPaginate from 'react-paginate';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [post, loading, refetch] = usePost();
    const axiosPublic = useAxiosPublic();
    // console.log(post)
    const [postData, setPostData] = useState([]);
    const [searchType, setSearchType] = useState('normal');
    const [pageCount, setPageCount] = useState(5);
    const [limit = 5, setLimit] = useState();
    const [currentPage = 1, setCurrentPage] = useState();
    const movies = React.useRef(null);
    const [selectTag, setSelectTag] = useState('');
    const [selectSearch, setSelectSearch] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [popularTexts, setPopularTexts] = useState([]);
    const [announcement, setAnnouncement] = useState([]);

    useEffect(() => {
        movies.current = 1;
        // Fetch data when the component mounts or when searchType changes
        const apiUrl = searchType === 'popular' ? '/popular' : '/posts';
        axiosPublic.get(`${apiUrl}?page=${currentPage}&limit=${limit}&tag=${selectTag || selectSearch}`)
            .then(res => {
                // console.log(res.data.pageCount)
                setPageCount(res.data.pageCount)
                setPostData(res.data.result);
            });


        axiosPublic.get(`/searchText`)
            .then(res => {
                setPopularTexts(res.data);
            });


        axiosPublic.get('/announcement')
            .then(res => {
                console.log(res.data);
                setAnnouncement(res.data);
            })

    }, [searchType]);

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setSelectSearch('');
        setSelectTag('')

    };






    const handleSelectTag = (e) => {
        setSelectTag(e.target.value);
        // `https://blood-donation-server-beta.vercel.app/posts/search?tag=${selectTag}`

    };

    const handleSearch = (e) => {
        e.preventDefault();
        const from = e.target;
        const searchText = e.target.searchText.value.toLowerCase();

        const searchInfo = {
            searchText
        }
        setSelectSearch(searchText)
        axiosPublic.post(`/searchText`, searchInfo)
            .then(res => {
                // console.log(res.data);
                setIsShow(true);

            })

        axiosPublic.get(`/posts?page=${currentPage}&limit=${limit}&tag=${selectTag || searchText}`)
            .then(res => {
                // console.log(res.data);
                setPageCount(res.data.pageCount)
                setPostData(res.data.result);
                setIsShow(true);
                setSelectTag("");

            })
    }

    const handlePageClick = (e) => {
        // console.log(e);
        setCurrentPage(e.selected + 1)
        movies.current = e.selected + 1
        const apiUrl = searchType === 'popular' ? '/popular' : '/posts';
        axiosPublic.get(`${apiUrl}?page=${e.selected + 1}&limit=${limit}&tag=${selectTag || selectSearch}`)
            .then(res => {
                // console.log(res.data.result)
                setPostData(res.data.result);
            });
    }


    return (
        <div className='space-y-10 mb-10 container mx-auto'>
            <div className=''>
                <Banner popularTexts={popularTexts} selectTag={selectTag} handleSelectTag={handleSelectTag} handleSearch={handleSearch} ></Banner>
            </div>
            <div className='mt-10 space-y-10 p-2'>
                <div className='flex flex-col gap-6 md:flex-row justify-between items-center  '>
                    {
                        announcement.length > 0 ?
                            <>
                                <div className=' w-full mid:w-3/4 mb-3 '>
                                    {
                                        announcement.slice(0, 1).map((item, index) => <div key={item._id}>
                                            <div className='flex justify-start gap-2 items-center'>
                                                <img src={item?.AuthorImage} className='w-8 rounded-full' alt="" />
                                                <p>{item.AuthorName}</p>
                                            </div>
                                            <div >
                                                <p className='font-bold text-2xl mb-3'>{item.AnnounceTitle}</p>
                                                <div>
                                                    {
                                                        item?.AnnounceDescription?.length < 100 ? <> <p className='ml-3'>{item.AnnounceDescription} </p></> :
                                                            <> <p className='ml-3'>{item?.AnnounceDescription?.slice(0, 100)}<span onClick={() => document.getElementById(`announcement${item._id}`).showModal()} className='btn btn-link no-underline lowercase' >...See More</span> </p></>
                                                    }
                                                </div>
                                                <dialog id={`announcement${item._id}`} className="modal">
                                                    <div className="modal-box max-w-6xl">
                                                        <img src={item?.AuthorImage} className='w-8 rounded-full' alt="" />
                                                        <p className="py-4">{item.AnnounceDescription}</p>
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </div>
                                        </div>)
                                    }
                                    <div>
                                        <Link to="/announcement" className='btn btn-sm btn-link lowercase'>See All Announcement</Link>
                                    </div>
                                </div>
                            </> :
                            <></>
                    }
                    <div className=' w-full md:w-1/4 mt-3'>
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


                    {/*  */}
                </div>
                <div >
                    <h1 className='text-center text-2xl font-bold p-0' >All Posts</h1>
                </div>
                <div>
                    <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10' >
                        {
                            Array.isArray(postData) ? (
                                postData.map(item => (
                                    <Post key={item._id} item={item}></Post>
                                ))
                            ) : (
                                <div className=' flex justify-center items-center'>
                                    <p>Loading...</p>
                                </div> // You can add a loading indicator
                            )
                        }
                    </div>
                </div>
                {
                    <div className='flex justify-center mt-4 mb-4 text-sm'>
                        <ReactPaginate
                            className='flex gap-1 lg:gap-10 border p-1 lg:p-5 rounded-lg  paigaination'
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
                }


            </div>

        </div >
    );
};

export default Home;




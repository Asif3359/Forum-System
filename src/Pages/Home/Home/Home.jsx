import React from 'react';
import Banner from '../Banner/Banner';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import usePost from '../../../Hooks/usePost';
import Post from '../../../Components/Post/post';

const Home = () => {

    const axiosPublic = useAxiosPublic();
    const [post, loading, refetch] = usePost();

    const announcement = 1;
    return (
        <div>
            <Banner></Banner>
            <div className='mt-10 px-1'>
                <div className='block md:flex flex-row-reverse justify-between items-start  gap-3'>

                    {
                        announcement ? <><div className='w-full md:w-1/3 space-y-3'>
                            <h1 className=' text-2xl font-bold' >An Announcement</h1>
                            <div role="alert" className="border-2 p-3 rounded-lg">
                                <div className='space-y-3'>
                                    <h1 className='text-xl font-bold'>Tittle Lorem, ipsum dolor. </h1>
                                    <p className="">Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, accusamus.</p>
                                </div>
                            </div>
                        </div></> : <></>
                    }

                    <div className=' flex-1 space-y-3'>
                        <div>
                            <h1 className='text-center text-2xl font-bold' >All Poste</h1>
                        </div>
                        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {
                                post.map((item, index) => <Post key={item._id} item={item}></Post>)
                            }
                        </div>
                    </div>

                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
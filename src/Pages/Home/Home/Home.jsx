import React from 'react';
import Banner from '../Banner/Banner';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-start'>
                <div className='flex-1'>
                    Post
                </div>
                <div className='w-1/3'>
                    An Announcement 
                    <div role="alert" className="border-2 p-3 rounded-lg">
                        <div className='space-y-3'>
                            <h1 className='text-xl font-bold'>Tittle Lorem, ipsum dolor. </h1>
                            <p className="">Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, accusamus.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
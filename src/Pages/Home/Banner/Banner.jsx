import { FaSearch } from 'react-icons/fa';
import bannerImg from '../../../assets/Banner/2945521_28662.jpg';
import { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Banner = ({popularTexts, selectTag, handleSelectTag, handleSearch}) => {


    return (
        <div>
            <div className="hero min-h-[70vh]" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className=" text-center text-neutral-content">
                    <div className="">
                        <h1 className="mb-5 text-3xl font-bold">Please Search Your Items</h1>
                        <div className='px-10 flex flex-col gap-3 md:flex-row justify-center md:justify-start md:items-center text-black '>
                            <select onChange={handleSelectTag} className="p-3 w-full md:w-1/4 rounded-lg">
                                <option>Select</option>
                                {
                                    popularTexts.map((item , index)=><option key={index} value={item._id}>{item._id}</option>)
                                }
                               
                            </select>
                            <form onSubmit={handleSearch} className='flex justify-start items-center flex-1'>
                                <input type="text" name='searchText' defaultValue={selectTag} placeholder="Write You Text" className="p-3 rounded-l-lg w-full" />
                                <input type='submit' value="Submit" className='rounded-r-lg bg-base-200 btn rounded-none' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Banner;

import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AnnouncementHome = () => {

    const axiosPublic = useAxiosPublic();
    const [announcement, setAnnouncements] = useState([]);

    useEffect(() => {

        axiosPublic.get('/announcement')
            .then(res => {
                setAnnouncements(res.data)
            })

    }, [])
    return (
        <div className='mt-4 space-y-10'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold uppercase'> AnnouncementHome</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {
                    announcement.map((item, index) => <div className='space-y-4' key={item._id}>
                        <div className='flex justify-start gap-2 items-center'>
                            <img src={item?.AuthorImage} className='w-8 rounded-full' alt="" />
                            <p>{item.AuthorName}</p>
                        </div>
                        <div >
                            <p className='font-bold text-2xl mb-3'>{item.AnnounceTitle}</p>
                            <div>
                                {
                                    item?.AnnounceDescription?.length < 200 ? <> <p className='ml-3'>{item.AnnounceDescription} </p></> :
                                        <> <p className='ml-3'>{item?.AnnounceDescription?.slice(0, 200)}<span onClick={() => document.getElementById(`announcementPage${item._id}`).showModal()} className='btn btn-link no-underline' >...See More</span> </p></>
                                }
                            </div>
                            <dialog id={`announcementPage${item._id}`} className="modal">
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
            </div>
        </div>
    );
};

export default AnnouncementHome;
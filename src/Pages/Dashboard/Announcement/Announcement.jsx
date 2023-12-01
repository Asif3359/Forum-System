import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Announcement = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleMakeAnnouncement = (e) => {
        e.preventDefault();
        const from = e.target;
        const AnnounceTitle = from.AnnounceTitle.value;
        const AnnounceDescription = from.AnnounceDescription.value;
        const AuthorName = user.displayName;
        const AuthorImage = user.photoURL;
        const AuthorEmail = user.email;
        const announcementDate=new Date();

        const announcementInfo = {
            AnnounceTitle,
            AnnounceDescription,
            AuthorName,
            AuthorImage,
            AuthorEmail,
            announcementDate,
        }
        // console.log(announcementInfo);
        axiosSecure.post('/announcement', announcementInfo)
            .then(res => {
                console.log(res);
                from.reset();
            })

    }
    return (
        <div className='mt-5'>
            <h1 className='text-center font-bold text-4xl'>Make An Announcement</h1>
            <div className='mt-10'>
                <form onSubmit={handleMakeAnnouncement} className='space-y-5'>
                    <div className='space-y-3'>
                        <label htmlFor='title'><p className='text-2xl font-bold'>Title</p></label>
                        <input type="text" id='title' name='AnnounceTitle' placeholder='Title' className='w-full p-2 border-2 rounded-lg' />
                    </div>
                    <div className='space-y-3'>
                        <label htmlFor='Description'><p className='text-2xl font-bold'>Description</p></label>
                        <textarea type="text" id='Description' name='AnnounceDescription' placeholder='Description' className='w-full h-48 p-2 border-2 rounded-lg' />
                    </div>
                    <div>
                        <input type="submit" className='btn w-full' value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Announcement;
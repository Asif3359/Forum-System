import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Membership = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    


    const handlePayment = (e) => {
        e.preventDefault();

        const from = e.target;
        const badgeType = from.badgeType.value;
        const address = from.address.value;
        const userName = user.displayName;
        const userEmail = user.email;
        const paymentDate = new Date();
        const paymentNumber = from.paymentNumber.value;

        const paymentInfo = {
            badgeType, address, userName, userEmail, paymentDate, paymentNumber
        }
        axiosSecure.post(`/member/?email=${userEmail}`, paymentInfo)
            .then(res => {
                console.log(res.data);
                window.location.replace(res.data.url);
            })

    }
    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left space-y-4">
                        <h1 className="text-5xl font-bold">Need Membership</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <div className='space-y-2'>
                            <p className='text-3xl font-bold'>Gold Badge </p>
                            <p className='ml-5'>You 100 post  per Month </p>
                            <p className='ml-5'>tk 100</p>
                        </div>
                        <div className='space-y-2'>
                            <p className='text-3xl font-bold'>Diamond Badge </p>
                            <p className='ml-5'>You 500 post  per Month</p>
                            <p className='ml-5'>tk 500</p>
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm  border ">
                        <form onSubmit={handlePayment} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name='address' placeholder="Mirpur, Dhaka" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Level</span>
                                </label>
                                <select
                                    id="badgeType"
                                    name="badgeType"

                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Any option</option>
                                    <option value="gold">Gold Badge</option>
                                    <option value="diamond">Diamond Badge</option>
                                </select>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Number</span>
                                    </label>
                                    <input type="text" name='paymentNumber' placeholder="017xxxxxxx" className="input input-bordered" required />
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="submit" className='btn btn-sm' name="" id="" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;
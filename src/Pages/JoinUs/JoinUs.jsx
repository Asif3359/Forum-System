import { useForm } from "react-hook-form"

import loginImage from "../../assets/logIn.jpg"
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const JoinUs = () => {

    const axiosPublic = useAxiosPublic();
    const navigate= useNavigate();

    const { googleSignIn, signIn } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success(' Successfully Logged In', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate('/');
            })
    }

    const handleSocial = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    badgeType:'Bronze'
                }
                console.log(userInfo);

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success(' Successfully Logged In', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigate('/');
                    })
            })
    }
    return (
        <div>
            <div className="flex justify-between items-center gap-3">
                <div className="w-3/5">
                    <img src={loginImage} className="w-4/5" alt="" />
                </div>
                <div className="space-y-3 flex-1">
                    <div >
                        <h1 className="text-3xl font-bold">Please Join Us</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email@gmail.com" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                            })} placeholder="••••••••" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}

                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className=" " required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn  btn-sm" type="submit" value="Sign Up" />
                        </div>
                        <p>Don't have an account please! <Link to="/register" className="font-bold text-yellow-600 hover:underline">Register</Link> </p>
                        <div className="text-center">
                            <h1 className="text-xl font-bold">Log in With</h1>
                        </div>
                        <div className="divider"></div>


                    </form>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <button className="btn btn-sm" onClick={handleSocial}> <FaGoogle /> Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
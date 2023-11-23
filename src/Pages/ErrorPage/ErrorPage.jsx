import { Link } from "react-router-dom";
import img404 from "../../assets/404Error.jpg"

const ErrorPage = () => {
    return (
        <div className="">
            <div className="flex justify-between items-center gap-10">
                <div className="w-3/4">
                    <img src={img404} className="" alt="" />
                </div>
                <div className="w-1/4 space-y-3">
                    <h1 className="text-4xl font-bold"> This Page is Not Found </h1>
                    <div className="space-y-2">
                        <p className="text-xl font-bold">Go to Home</p>
                        <Link to="/" className="btn btn-success">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
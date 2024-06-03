import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="ERROR GIF" />
            <div className="absolute min-h-[450px] w-full bottom-[12%] flex flex-col items-center justify-between">
                <h1 className="text-6xl font-roboto font-semibold text-[#151515db]">404</h1>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-2xl font-roboto font-medium text-[#151515bc]">{"Look like you're lost"}</h2>
                    <p className="text-[#151515ac]">{"the page you're looking for not available else under construction"}</p>
                    <Link to={'/'}>
                        <button className="btn rounded-none text-white bg-green-600 hover:bg-green-500">Go to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;

// gif : https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif
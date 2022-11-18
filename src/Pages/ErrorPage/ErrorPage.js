import React from "react";
import { Link } from "react-router-dom";

//Error Animation Gif
import image from "../../Components/Images/Svgs/2.gif";

const PageNotFound = () => {
  return (
    <>
      <div>
        <div className="px-4 py-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mb-2 ">
          <div className=" flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl py-2 lg:text-red-600 text-green-800 font-poppins font-extrabold sm:text-5xl">
              404 Error!!!
            </h1>
            <Link to="/" className="bg-yellow-500 py-2 px-3 mt-4 text-lg text-slate-700 font-bold rounded">
              Go to Home
            </Link>
          </div>
          <div className=" w-[72vh] mx-auto flex justify-center items-center">
            <img src={image} alt="img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;

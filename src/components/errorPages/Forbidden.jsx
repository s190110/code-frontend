import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center text-center bg-neutral-100">
      <div className="bg-white flex flex-col rounded shadow-md p-4 w-4/5 md:w-[500px]">
        <div className="flex gap-2 items-center pb-2 border-b justify-center text-lg text-red-700 font-semibold">
          <FaTriangleExclamation className="text-lg" />
          <h1 className="">Access Restricted</h1>
        </div>
        <p className="text-black py-2">
          Access Restricted Sorry,you have been already submitted or you have
          been blocked from the assessment due to unfair practices. Please
          contact assessment organiser for further details, You will be able to
          check your report card after the end of assessment You will be able to
          retake this assessment after a few days
        </p>
        <Link to={"/home"} className="bg-red-600 px-4 py-1.5 w-fit mx-auto">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;

import React from "react";

const Shimmer = () => {
  const questions = [1, 2, 3, 4, 5];
  return (
    <div className="m-20">
      <div className="border-[1px] border-l-6 rounded-sm border-gray-200 h-14 w-full ">
        <p className="w-full p-4 bg-gray-300 animate-pulse h-full"></p>
      </div>

      <div className="md:flex md:gap-10 mt-10">
        <div className="w-full border border-gray-300 rounded-md md:w-2/5 shadow-md h-fit">
          <div className="flex justify-between border-b border-gray-200 bg-gray-200 p-2">
            <h1 className="">Problem list</h1>
            <h1 className="">Score</h1>
          </div>
          {questions.map((ele, ind) => (
            <div
              key={ind}
              className="flex justify-between border-b border-gray-200 bg-white p-2"
            >
              <p className="h-8 rounded-sm p-4 w-full animate-pulse bg-gray-300"></p>
              <p className="bg-gray-300 px-2  animate-pulse"></p>
            </div>
          ))}
        </div>
        <div className="w-full border border-gray-300 rounded-md md:w-2/5 shadow-md">
          <h1 className="border-b border-gray-200 bg-gray-200 p-2">Ranking</h1>
          <div className="flex justify-between border-b border-gray-200 bg-white p-2">
            <p className="">Rank</p>
            <p className="">Name</p>
            <p>Score</p>
            <p>finish time</p>
          </div>
          {questions.map((ele, ind) => (
            <div
              key={ind}
              className="flex justify-between border-b border-gray-200 bg-white p-2"
            >
              <p className="h-8 rounded-sm p-4 w-full animate-pulse bg-gray-300"></p>
              <p className="w-full animate-pulse bg-gray-300"></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Shimmer;

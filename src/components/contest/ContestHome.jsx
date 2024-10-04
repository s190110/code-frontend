import React from "react";
import useGetContests from "../../hooks/useGetContests";
import { NavLink } from "react-router-dom";

const ContestHome = () => {
  const contests = useGetContests();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center p-4 text-black">
        Registered Contests
      </h1>
      {!contests?.registered?.length && (
        <h1 className=" text-center text-gray-700">
          Not Registered to any contest{" "}
        </h1>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-4">
        {contests?.registered?.map((ele, ind) => (
          <ContestCard contest={ele} key={ind} />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-center p-4 text-black">
        Past Contests
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-4">
        {contests?.pastParticipated?.map((ele, ind) => (
          <ContestCard contest={ele} key={ind} />
        ))}
      </div>
      <h1 className="text-3xl font-bold text-center p-4 text-black">
        Upcoming Contests
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-4">
        {contests?.upComing?.map((ele, ind) => (
          <ContestCard contest={ele} key={ind} />
        ))}
      </div>
    </div>
  );
};

const ContestCard = ({ contest }) => {
  return (
    <NavLink
      to={`${contest.url}`}
      className="bg-gradient-to-br hover:scale-95 from-blue-200 to-blue-300 rounded-lg shadow-lg p-5 block"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">{contest.name}</h2>
      <p className="text-sm text-gray-700 mb-2">
        <span className=" font-semibold">Organisation: </span>
        {contest.organisation}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <span className=" font-semibold">Start Time: </span>
        {new Date(contest.startTime).toLocaleString()}
      </p>
      <p className="text-sm text-gray-700 mb-2">
        <span className=" font-semibold">End Time: </span>
        {new Date(contest.endTime).toLocaleString()}
      </p>
    </NavLink>
  );
};

export default ContestHome;

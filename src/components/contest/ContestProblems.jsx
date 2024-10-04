import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ContestRankings, GetContestProblems } from "../../../graphQL/Quary";
import { useQuery } from "@apollo/client";
import Shimmer from "./Shimmer";
import { getTimeDiff } from "../../services/time";
import { UserContext } from "../../context/User";

function ContestProblems() {
  const { user } = useContext(UserContext);
  const { contestURL } = useParams();
  const { data, error, loading } = useQuery(GetContestProblems, {
    variables: { contestUrl: contestURL },
    // fetchPolicy: "no-cache",
  });
  const { data: rdata } = useQuery(ContestRankings, {
    variables: { contestUrl: contestURL },
  });
  const date = new Date();
  const navigate = useNavigate();
  const { contestQuestions, name, endTime, startTime, title } =
    data?.contest || {};
  const [remTime, setRemTime] = useState(
    `Ends at  ${new Date(endTime).toLocaleString()}`
  );
  useEffect(() => {
    // if (new Date() > new Date(endTime)) navigate("/forbidden");
    const id = setInterval(() => {
      setRemTime(getTimeDiff(null, endTime, true));
    }, 1000);
    return () => clearInterval(id);
  }, [endTime]);
  if (error) navigate("/forbidden");
  if (loading) return <Shimmer />;
  return (
    <div className="container mx-auto text-black">
      <h1 className="text-2xl my-4">{name}</h1>
      <h1 className="p-4 border-[1px] border-gray-300 border-l-[6px] rounded-sm bg-white">
        {date > new Date(endTime) ? "The contest has ended" : remTime}
      </h1>

      <div className="md:flex md:gap-10 mt-10">
        <div className="w-full border border-gray-300 rounded-md md:w-2/5 shadow-md h-fit">
          <div className="flex justify-between border-b border-gray-200 bg-gray-200 p-2">
            <h1 className="">ContestProblem list</h1>
            <h1 className="">Score</h1>
          </div>
          {contestQuestions?.map((ele, ind) => (
            <div
              key={ind}
              className="flex justify-between border-b border-gray-200 bg-white p-2"
            >
              <Link
                to={`solve/${ele.problemId}`}
                className="text-blue-800 cursor-pointer"
              >
                {ele.problem.title}
              </Link>
              <p className="bg-gray-300 px-2 rounded-xl">3</p>
            </div>
          ))}
        </div>
        <div className="w-full border border-gray-300 rounded-md md:w-2/5 shadow-md my-10 md:my-0">
          <h1 className="border-b border-gray-200 bg-gray-200 p-2">Rankings</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr className="border-b border-gray-200 p-2">
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Score</th>
                <th className="text-left p-2">Finish Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rdata?.rankings?.map((ele, ind) => (
                <tr
                  key={ind}
                  className={`border-b border-gray-200 p-2 ${
                    ele?.User?.id == user.id ? "bg-neutral-100" : ""
                  }`}
                >
                  <td className="p-2">{ind + 1}</td>
                  <td className="p-2">{ele?.User?.userName}</td>
                  <td className="p-2">{ele.score}</td>
                  <td className="p-2">
                    {ele?.lastSubmitted
                      ? new Date(ele.lastSubmitted).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ContestProblems;

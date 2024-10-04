import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { GetAllSubmissions } from "../../graphQL/Quary";
import { UserContext } from "../context/User";
import { NavLink } from "react-router-dom";
import TableShimmer from "../components/shimmer/TableShimmer";
import Paginate from "./shared/Paginate";

const SubmissionsTable = () => {
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);
  const [getSubmissions, { data, error, loading }] =
    useLazyQuery(GetAllSubmissions);
  useEffect(() => {
    const start = async () =>
      getSubmissions({ variables: { userId: user.id, pagination: { page } } });
    start();
  }, [page]);

  const { submissions } = data || {};
  return (
    <div className="container mx-auto min-h-[90vh] w-screen overflow-x-scroll">
      <table className="w-full p-2">
        <tbody className="w-full">
          <tr className="text-gray-600 font-semibold border-b">
            <td className="p-3">Status</td>
            <td className="p-3">Language</td>
            <td className="p-3 line-clamp-1 border-b">Title</td>
            <td className="">Done in contest</td>
            <td className="">Submitted At</td>
          </tr>
          {loading && <TableShimmer />}
          {submissions?.map((ele, ind) => (
            <tr key={ind} className="text-black even:bg-neutral-100 border-b">
              <td
                className={`p-3 line-clamp-1 cursor-pointer ${
                  ele.errorDetails ? "text-red-700" : "text-green-700"
                }`}
              >
                {!ele.errorDetails
                  ? "Accepted"
                  : ele.errorDetails.startsWith(" Error at test case")
                  ? "Wrong Answer"
                  : "Runtime Error"}
              </td>
              <td className="p-3 ">
                <h1 className="p-1 rounded-full bg-gray-200 w-fit text-sm px-2">
                  {ele?.language}
                </h1>
              </td>
              <td className="p-3 line-clamp-1 hover:text-blue-600 cursor-pointer">
                <NavLink to={"/problem/" + ele.problemId}>
                  {ele?.problem.title}
                </NavLink>
              </td>
              <td className="">{ele.isInContest ? "true" : "false"}</td>
              <td>{new Date(ele.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginate page={page} setPage={setPage} />
    </div>
  );
};

export default SubmissionsTable;

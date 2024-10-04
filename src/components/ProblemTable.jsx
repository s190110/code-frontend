import React, { useState } from "react";
import useGetAllProblems from "../hooks/useGetAllProblems";
import { NavLink } from "react-router-dom";
import { LuCheckCircle } from "react-icons/lu";
import { IoMdCloseCircleOutline } from "react-icons/io";
import TableShimmer from "./shimmer/TableShimmer";
import Paginate from "./shared/Paginate";

const ProblemTable = () => {
  const [page, setPage] = useState(1);
  const [data, error, loading] = useGetAllProblems(page);

  return (
    <div className="container mx-auto text-lg ">
      <h1 className="text-center text-amber-700 text-2xl p-4 font-semibold">
        Practice Problems from previous Contests
      </h1>
      <table className="w-full">
        <tbody className="">
          <tr className="text-gray-500 text-left border-b">
            <td className="p-3 w-10">Status</td>
            <td className="p-3">Title</td>
            <td className="p-3">Difficulty</td>
          </tr>
          {loading && <TableShimmer />}
          {data?.problems?.map((ele, ind) => (
            <tr key={ind} className="text-black even:bg-neutral-100">
              <td className="pl-4 w-10">
                {ele.status == "done" ? (
                  <LuCheckCircle className="text-green-600 size-6" />
                ) : ele.status == "try" ? (
                  <IoMdCloseCircleOutline className="text-yellow-500 size-7" />
                ) : (
                  ""
                )}
              </td>
              <td className="p-3 line-clamp-1 hover:text-blue-600 cursor-pointer">
                <NavLink to={"/problem/" + ele.id}>
                  {(page-1)*10+(ind + 1) + ". " + ele.title}
                </NavLink>
              </td>
              <Difficulty difficulty={ele.difficulty} />
            </tr>
          ))}
        </tbody>
      </table>
      <Paginate page={page} setPage={setPage} />
    </div>
  );
};
// const a="";
// a.to
const Difficulty = ({ difficulty }) => {
  if (difficulty.toLowerCase() == "hard")
    return <td className="p-3 text-amber-900">Hard</td>;
  if (difficulty.toLowerCase() == "medium")
    return <td className="p-3 text-yellow-500">Medium</td>;
  if (difficulty.toLowerCase() == "easy")
    return <td className="p-3 text-green-700">Easy</td>;
  return <td className="p-3 text-green-700">N/A</td>;
};

export default ProblemTable;

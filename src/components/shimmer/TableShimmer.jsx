import React from "react";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];
const TableShimmer = () => {
  return (
    <>
      {data.map((ele, ind) => (
        <tr className="even:bg-gray-300 animate-pulse" key={ind}>
          <td className="h-11"></td>
          <td className="h-11"></td>
          <td className="h-11"></td>
        </tr>
      ))}
    </>
  );
};

export default TableShimmer;

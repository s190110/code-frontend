import React, { useState } from "react";
import DisplayCode from "./DisplayCode";
import MDEditor from "@uiw/react-md-editor";

const Description = ({ data, submissions, loading }) => {
  const { problem } = data || {};
  const [menu, setMenu] = useState(0);

  return (
    <div className="p-3 m-2 pr-0 border rounded-xl overflow-x-hidden h-full mr-0 flex flex-col select-none">
      {loading && <h1 className="text-center my-auto">Loading...</h1>}
      <ul className="cursor-pointer items-center flex gap-3 text-lg border-b">
        <li
          onClick={() => setMenu(0)}
          className={menu == 0 ? "p-2 border-black border-b" : ""}
        >
          Problems
        </li>
        <li
          onClick={() => setMenu(1)}
          className={menu == 1 ? "p-2 border-black border-b" : ""}
        >
          Submitions
        </li>
        {menu >= 2 && (
          <li className="p-2 border-black border-b">Sub details</li>
        )}
      </ul>
      {menu == 1 &&
        (submissions.length ? (
          <table className="w-full">
            <tr className="text-gray-500 text-center border-b">
              <td className="p-3">Status</td>
              <td className="p-3">Language</td>
              <td className="p-3">SubmittedAt</td>
            </tr>
            {submissions?.map((ele, ind) => (
              <tr
                key={ind}
                className="text-black even:bg-neutral-100 cursor-pointer hover:bg-neutral-200"
                onClick={() => setMenu(ind + 2)}
              >
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
                <td className="p-3 line-clamp-1">
                  {new Date(ele?.submittedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <h1 className="p-3 text-center">not submitted any code yet</h1>
        ))}
      {menu == 0 && (
        <div className="h-full overflow-y-scroll px-2" data-color-mode="light">
          <h1 className="py-2 text-xl font-semibold h-fit">{problem?.title}</h1>
          <MDEditor.Markdown source={problem?.description} />
          {problem?.examples?.map((ex, ind) => (
            <div key={ind}>
              <h1 className="py-2 font-semibold">Example {ind + 1}</h1>
              <Example example={ex} key={ind} />
            </div>
          ))}
        </div>
      )}
      {menu >= 2 && (
        <div className="p-2">
          <h1 className="my-2">submission details</h1>
          {submissions[menu - 2].errorDetails ? (
            <div>
              <h1 className="my-2 text-red-600">Error</h1>
              <div className="my-2 bg-red-500 bg-opacity-30 rounded-md p-3 text-red-500">
                {submissions[menu - 2].errorDetails}
              </div>
            </div>
          ) : (
            <h1 className="text-green-700">Accepted</h1>
          )}

          {submissions[menu - 2].errorDetails.startsWith(
            " Error at test case"
          ) && (
            <div>
              <h1 className="font-semibold p-2">Input</h1>
              <h2 className="px-2 py-1.5 border rounded border-blue-500 bg-neutral-100">
                {submissions[menu - 2]?.input || "N/A"}
              </h2>
              <h1 className="font-semibold p-2">Expected Output</h1>
              <h2 className="px-2 py-1.5 border rounded border-blue-500 bg-neutral-100">
                {submissions[menu - 2]?.expectedOutput}
              </h2>
              <h1 className="font-semibold p-2">Your Output</h1>
              <h2 className="min-h-8 cursor-pointer px-2 py-1.5 border rounded border-blue-500 bg-neutral-100">
                {/* output for all test cases to is availabale at Output */}
                {submissions[menu - 2]?.output}
              </h2>
            </div>
          )}
          <DisplayCode
            code={submissions[menu - 2].code}
            language={submissions[menu - 2].language}
          />
        </div>
      )}
    </div>
  );
};

const Example = ({ example }) => {
  const { input, output, explanation } = example || {};
  return (
    <div className="bg-neutral-100 border-l-4 border-gray-300 p-3 m-2 rounded">
      <h1 className="font-semibold">input</h1>
      <h2 className="p-1">{input}</h2>
      <h1 className="font-semibold">output</h1>
      <h2 className="p-1">{output}</h2>
      {explanation && <h1 className="font-semibold">explanation</h1>}
      <h2 className="p-1">{explanation}</h2>
    </div>
  );
};

export default Description;

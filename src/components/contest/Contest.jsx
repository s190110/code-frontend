import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { isnameAvailable } from "../../../graphQL/Quary";

function Contest({ data, handleChange, valerror, setValerror }) {
  const [isvailable, { data: nres, loading }] = useLazyQuery(isnameAvailable);
  const [success, setSuccess] = useState("");

  function validateData(data) {
    const currentTime = new Date();
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);
    if (!data.startTime || !data.endTime) return "Enter Valid Date And Time!";
    // Check if startTime is greater than current time
    if (startTime <= currentTime) {
      return "Start time must be in the future.";
    }

    // Check if endTime is greater than startTime
    if (endTime <= startTime) {
      return "End time must be greater than start time.";
    }

    // Validate URL using a regular expression
    const urlRegex = /^[a-zA-Z0-9-]+$/;
    if (!urlRegex.test(data.url)) {
      return "URL can only contain numbers, alphabets, and hyphens.";
    }

    // If all validations pass, return null
    return null;
  }

  const handleNext = async () => {
    const verror = validateData(data);
    if (verror) {
      setValerror(verror);
      return;
    }
    const res = await isvailable({ variables: { contestName: data.url } });
    const { ok: okk, error: er } = res?.data?.isContestNameAvailable || {};
    setValerror(er);
    setSuccess(okk);
    // if (ok) navigate("questions");
  };
  return (
    <>
      <div className="bg-white h-full p-4 text-black">
        <h1 className="text-3xl font-bold text-center my-5 text-gray-600">
          Contest Details
        </h1>
        <div className="gap-4 mb-5 lg:flex-row flex-col-reverse flex w-8/12 p-7 mx-auto justify-center items-center bg-gray-800 rounded-3xl">
          <div className="lg:mr-3 mr-0 w-full lg:w-6/12 flex justify-center items-center flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2 w-full bg-gray-300">
              <span className="font-semibold">Contest name</span>
              <input
                name="name"
                type="text"
                className="grow"
                placeholder="Enter contest name"
                onChange={handleChange}
                value={data.name}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full bg-gray-300">
              <span className="font-semibold">Contest URL</span>
              <input
                name="url"
                type="text"
                className="grow"
                placeholder="Enter contest name"
                onChange={handleChange}
                value={data.url}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full bg-gray-300">
              <span className="font-semibold">Start date</span>
              <input
                name="startTime"
                type="datetime-local"
                className="grow"
                placeholder="Daisy"
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full bg-gray-300">
              <span className="font-semibold">End date</span>
              <input
                name="endTime"
                type="datetime-local"
                className="grow"
                placeholder="Daisy"
                onChange={handleChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 w-full bg-gray-300">
              <span className="font-semibold">Organisation name</span>
              <input
                name="organisation"
                type="text"
                className="grow"
                placeholder="Enter org name"
                onChange={handleChange}
                value={data.organisation}
              />
            </label>
            <span className="font-semibold p-2 text-red-700">{valerror}</span>
            <span className="font-semibold p-2 text-green-600">
              {!valerror && success ? "continue adding questions below" : ""}
            </span>

            <button
              className="btn text-black bg-green-500 w-full hover:bg-green-400 border-none"
              onClick={handleNext}
            >
              check url availability
            </button>
          </div>
          <div className="w-full lg:w-7/12 rounded-3xl overflow-hidden">
            <img
              src="/images/3.png"
              alt="no image"
              className="hidden md:block"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Contest;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GetContestDetails, IsRigistered } from "../../../graphQL/Quary";
import { RegisterToContest } from "../../../graphQL/Mutations";

const ContestStart = () => {
  const { user } = useContext(UserContext);
  const { contestURL } = useParams();
  const { data: cdata, error: cerror } = useQuery(GetContestDetails, {
    variables: { contestUrl: contestURL },
  });
  const { contest } = cdata || {};
  const navigate = useNavigate();
  const [bname, setBname] = useState("");
  const [registerToContest, { data, error, loading }] =
    useMutation(RegisterToContest);
  const [isrigistered, { data: rdata }] = useLazyQuery(IsRigistered);
  useEffect(() => {
    const start = async () => {
      let res = null;
      if (contest?.id)
        res = await isrigistered({ variables: { contestId: contest?.id } });
    };
    start();
    if (new Date(contest?.endTime) <= new Date()) setBname("Open");
    else {
      if (user) {
        if (rdata?.isRigistered) {
          // console.log(new Date(contest?.startTime  new Date())
          if (new Date(contest?.startTime) > new Date())
            setBname("will start soon");
          else setBname("Join");
        } else setBname("Register");
      } else setBname("SignIn");
    }
  }, [contest, rdata]);
  if (cerror) navigate("/pageNotFound");
  const handleClick = async () => {
    if (bname == "SignIn") navigate("/login");
    else if (bname == "Register") {
      const res = await registerToContest({
        variables: { contestId: contest?.id },
      });
      if (res?.data?.contest?.id) setBname("will start soon");
      // console.log(res);
    } else if (bname == "Join") {
      console.log("Joining");
      navigate(`/contest/participate/${contest?.url}`);
    } else if (bname == "Open") {
      navigate(`/contest/view/${contest?.url}`);
    } else {
      console.log("not yet started");
      // navigate("");
    }
  };
  const date = new Date();
  return (
    <div className="w-full text-black min-h-[100vh]">
      <div className="relative w-full h-[55vh] flex justify-center items-center text-white">
        <img
          className="absolute -z-[-10] top-0 left-0 h-full w-full object-fill"
          src="/images/contestStart.jpeg"
        />
        <div className="text-center z-10 flex flex-col items-center">
          <h1 className="font-semibold p-3 text-2xl">{contest?.name}</h1>
          <p className="font-semibold text-xl">{`${new Date(
            contest?.startTime
          ).toLocaleString()} \0\0\0 to \0\0\0  ${new Date(
            contest?.endTime
          ).toLocaleString()}`}</p>
          {bname == "Open" && (
            <h1 className="text-neutral-200 p-3 font-semibold">
              Cotest ended, you can check the Problems and ranking by clicking
              open
            </h1>
          )}
          <div className="bg-black p-0 size-fit m-3">
            <button
              onClick={handleClick}
              className="px-4 py-2 font-semibold text-white bg-green-600 hover:-translate-x-1 hover:-translate-y-1"
            >
              {bname}
            </button>
          </div>
          <p className="text-gray-300 absolute bottom-0 right-0 m-3">
            <span className="font-semibold">OrganisedBy: </span>
            {contest?.organisation}
          </p>
        </div>
      </div>
      <div className="mx-auto container">
        <h1 className="text-center text-2xl font-semibold p-6">About</h1>
        <ul className="text-center line text-lg">
          <li>
            Contests are conducted in such a way that if we find you shifting
            tabs you will be blocked from the current contest.
          </li>
          <li>
            once you intensionally or unintensionally close the tab or window
            that is considerd as end of your contest.
          </li>
          <li>You can't open contest once closed.</li>
          <li>
            make sure you maintain consistant internet connection throughout the
            contest.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContestStart;

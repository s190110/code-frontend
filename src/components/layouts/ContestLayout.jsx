import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/User";
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { IoArrowBackSharp } from "react-icons/io5";
import { useQuery } from "@apollo/client";
import { GetContestDetails } from "../../../graphQL/Quary";
import useFull from "../../hooks/useFull";
import useTab from "../../hooks/useTab";
import {
  EndContestPopUp,
  FullScreenPopUp,
  TabSwitchPopUp,
} from "../popUps/PopUps";

const ContestLayout = () => {
  const { contestURL } = useParams();
  const { user } = useContext(UserContext);
  if (!user) return null;
  const { data } = useQuery(GetContestDetails, {
    variables: { contestUrl: contestURL },
  });

  const [warnings, setWarnings] = useState(5);
  const { toggleFullscreen, isFullscreen } = useFull();
  const [endContest, setEndContest] = useState(false);
  const { tabSwitchWarning, setTabSwitchWarning } = useTab(
    warnings,
    setWarnings
  );
  // const { toggleFullscreen, isFullscreen } = {};
  // const { toggleFullscreen, isFullscreen } = useFullScreen(contestRef);
  // const __ = usePreventTabSwitch(data?.contest?.id, warning, setWarning);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return (
    <div className="h-[100vh] flex flex-col bg-white container mx-auto">
      <div className="sticky text-black top-0 z-10 left-0 flex justify-between w-full px-10 bg-slate-200 py-2">
        <Link
          to={`/contest/participate/${contestURL}`}
          className="flex gap-3 items-center cursor-pointer hover:scale-110"
        >
          <IoArrowBackSharp />
          <h1>Go to all questions</h1>
        </Link>
        <button
          className="py-2 px-5 bg-blue-700 rounded-md text-white"
          onClick={() => setEndContest(true)}
        >
          End Contest
        </button>
      </div>
      <Outlet />

      {!isFullscreen && <FullScreenPopUp toggleFullscreen={toggleFullscreen} />}
      {tabSwitchWarning && (
        <TabSwitchPopUp setTabSwitchWarning={setTabSwitchWarning} />
      )}
      {endContest && <EndContestPopUp setEndContest={setEndContest} />}
    </div>
  );
};

export default ContestLayout;

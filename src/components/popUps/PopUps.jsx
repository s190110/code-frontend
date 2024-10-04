import { IoMdExpand } from "react-icons/io";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const EndContestPopUp = ({ setEndContest }) => {
  return (
    <div className="fixed z-20 top-0 left-0 flex justify-center items-center w-screen h-[100dvh] backdrop-blur-sm">
      <div className="bg-white flex flex-col rounded shadow-md p-4 w-4/5 md:w-[500px]">
        <div className="flex gap-2 text-lg text-red-600 items-center font-semibold pb-2 border-b">
          <FaTriangleExclamation className="text-lg" />
          <h1 className="">Confirm End Contest</h1>
        </div>
        <p className="text-black py-2">
          Are you sure to end this contest.Once you end contest you can not open
          it until contest is over. Click 'End contest' to end Contest.
        </p>
        <div className="flex gap-4 justify-center font-semibold">
          <button
            onClick={() => setEndContest(false)}
            className="bg-green-500 px-4 py-1.5 w-fit"
          >
            Continue Contest
          </button>
          <a href={"/home"} className="bg-red-600 px-4 py-1.5 w-fit">
            End Contest
          </a>
        </div>
      </div>
    </div>
  );
};

export const TabSwitchPopUp = ({ setTabSwitchWarning }) => {
  return (
    <div className="fixed z-20 top-0 left-0 flex justify-center items-center w-screen h-[100dvh] backdrop-blur-sm">
      <div className="bg-white flex flex-col rounded shadow-md p-4 w-4/5 md:w-[500px]">
        <div className="flex gap-2 text-lg text-red-600 items-center font-semibold pb-2 border-b">
          <FaTriangleExclamation className="text-lg" />
          <h1 className="">Attention! Tab Switch Detected!</h1>
        </div>
        <p className="text-black py-2">
          Switching tabs between the conetst is not allowed. Doing so may lead
          to disQualification.Please complete the examp within the given time
          limit and refrain from switching tabs.
        </p>
        <button
          onClick={() => setTabSwitchWarning(false)}
          className="bg-red-600 px-4 py-1.5 w-fit mx-auto"
        >
          Sorry, I will not do this again!
        </button>
      </div>
    </div>
  );
};

export const FullScreenPopUp = ({ toggleFullscreen }) => {
  return (
    <div className="z-20 fixed top-0 left-0 flex justify-center items-center w-screen h-[100dvh] backdrop-blur-sm">
      <div className="bg-white flex flex-col rounded shadow-md p-4 w-4/5 md:w-[500px]">
        <div className="flex gap-2 text-black items-center pb-2 border-b">
          <IoMdExpand className="text-lg" />
          <h1 className="text-lg">Full Screen Mode Required</h1>
        </div>
        <p className="text-black py-2">
          In order to procedd with the contest, it is necessary to enable
          fullscreen mode.Click 'confirm' to enable full screen mode
        </p>
        <button
          onClick={toggleFullscreen}
          className="bg-blue-700 px-4 py-1.5 w-fit mx-auto text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
export const PasteCodePopUp = ({ setPopUp }) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-[100dvh] z-10 backdrop-blur-sm">
      <div className="bg-white flex flex-col rounded shadow p-4 w-4/5 md:w-[500px]">
        <div className="flex gap-2 text-red-900 font-semibold items-center pb-2 border-b">
          <FaTriangleExclamation className="text-lg" />
          <h1 className="text-lg">Detected copy pasting code</h1>
        </div>
        <p className="text-black py-2">
          You are not allowed to paste code to editor. Click 'confirm' to
          continue.
        </p>
        <button
          onClick={() => setPopUp(false)}
          className="bg-blue-700 px-4 py-1.5 w-fit mx-auto text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

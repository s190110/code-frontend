import React, { useEffect, useRef, useState } from "react";
import useFull from "../hooks/useFull";
import useTab from "../hooks/useTab";
import Forbidden from "./errorPages/Forbidden";
import { FullScreenPopUp, TabSwitchPopUp } from "./popUps/PopUps";

const Test = () => {
  const [warnings, setWarnings] = useState(5);
  const { toggleFullscreen, isFullscreen } = useFull();
  const { tabSwitchWarning, setTabSwitchWarning } = useTab(
    warnings,
    setWarnings
  );
  return (
    <div className="bg-neutral-200 h-screen p-2 bg-gradient-to-r from-orange-500 to-yellow-500">
      {!isFullscreen && <FullScreenPopUp toggleFullscreen={toggleFullscreen} />}
      {tabSwitchWarning && (
        <TabSwitchPopUp setTabSwitchWarning={setTabSwitchWarning} />
      )}
    </div>
  );
};

export default Test;

//   <Split
//   className="flex"
//     sizes={[50, 75]}
//     minSize={100}
//     expandToMin={false}
//     gutterSize={10}
//     gutterAlign="center"
//     snapOffset={30}
//     dragInterval={1}
//     direction="horizontal"
//     cursor="col-resize"
//   >
//     <div className="bg-red-400 h-[30vh] w-full"></div>
//     <div className="bg-yellow-400 h-[30vh] w-full"></div>
//   </Split>
// <div className="h-[100dvh] bg-black flex flex-col">
//   <Split
//     ref={splitRef}
//     className="h-full overflow-y-hidden flex flex-col"
//     direction="vertical"
//     gutterSize={5}
//     minSize={0}
//     sizes={[100, 0]}
//   >
//     <div className="h-full bg-red-300 w-full"></div>
//     <div className="h-fit bg-yellow-200 w-full"></div>
//   </Split>
//     <div className="h-fit text-black">console</div>
// </div>
// );

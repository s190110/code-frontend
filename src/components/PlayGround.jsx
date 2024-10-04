import CodeEditor from "./CodeEditor";
import Split from "react-split";
import { useRef, useState } from "react";

function PlayGround() {
  const [output, setOutput] = useState({ stderr: "", stdout: "" });
  const [loading, setLoading] = useState(false);
  const [fullscreenEditor, setfullscreenEditor] = useState(false);
  const splitRef = useRef(null);

  const setEditorFullscreen = () => {
    if (fullscreenEditor) splitRef?.current?.split.setSizes([50, 50]);
    else splitRef?.current?.split.setSizes([100, 0]);
    setfullscreenEditor(!fullscreenEditor);
  };

  return (
    <div className="bg-light-bg h-full">
      <Split ref={splitRef} className="split" gutterSize={5} minSize={0}>
        <div className="m-1 mr-0">
          <CodeEditor
            setPlaygroundOutput={setOutput}
            setPlaygroundLoading={setLoading}
            setEditorFullscreen={setEditorFullscreen}
          />
        </div>
        <div className="bg-white border m-1 ml-0 rounded-xl  overflow-x-hidden">
          <div className="font-semibold p-2 flex flex-row border-b-2 h-10 justify-between">
            <p>Output</p>
            {loading && <p>exicuting...</p>}
          </div>
          <div className="px-4 py-2 overflow-y-scroll  h-[calc(92vh-42px)]">
            {output?.stdout && (
              <div
                className="border border-lime-500 rounded-md p-2"
                style={{ overflowWrap: "break-word" }}
              >
                {output?.stdout?.split("\n").map((ele, ind) => (
                  <p key={ind}>{ele}</p>
                ))}
              </div>
            )}
            {output?.stderr && (
              <div
                className="rounded-md bg-red-600 text-red-500 bg-opacity-25 p-2"
                style={{ overflowWrap: "break-word" }}
              >
                {output?.stderr?.split("\n").map((ele, ind) => (
                  <p key={ind}>{ele}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </Split>
    </div>
  );
}

export default PlayGround;

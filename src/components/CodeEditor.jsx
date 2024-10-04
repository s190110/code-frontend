import Editor from "@monaco-editor/react";
import Timer from "./Timer";
import { useState, useRef, useEffect } from "react";
import { MdFullscreen, MdFullscreenExit, MdOutlineTimer } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa6";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Split from "react-split";

function CodeEditor({
  setPlaygroundOutput,
  setPlaygroundLoading,
  setEditorFullscreen,
}) {
  const [language, setLanguage] = useState("cpp");
  const [fullScreen, setFullscreen] = useState(false);
  const [timerexpand, setTimerexpand] = useState(false);
  const [output, setOutput] = useState({});
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const locataion = useLocation();
  const [timeTaken, setTimetaken] = useState("");
  const editorRef = useRef(null);
  const path = locataion.pathname;
  const splitRef = useRef(null);

  // useEffect(() => {
  //   // Get the current editor instance
  //   //window.monaco?.editor.getModels()[0];
  //   const editor = editorRef?.current?.getModel();
  //   if (editor) {
  //     const theme = night ? "vs-dark" : "vs";
  //     monaco.editor.setTheme(theme);
  //   }
  // }, [night]);

  useEffect(() => {
    editorRef?.current?.setValue(
      localStorage.getItem(path + "/" + language) || "//Enter ur code"
    );
    // Event listner for saving to local ctrl+S
    const onKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      const code = editorRef?.current?.getValue();
      localStorage.setItem(path + "/" + language, code);
      localStorage.setItem(path + "/", language);
      // remove Event listner
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [language]);

  const handleSave = () => {
    // console.log("lan ", language)
    const code = editorRef?.current?.getValue();
    localStorage.setItem(path + "/" + language, code);
    window.alert("saved to local");
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // editor.setTheme('light-dark');
    // if (night) monaco.editor.setTheme("vs-dark");
    localStorage.getItem(path + "/" + language) &&
      editorRef.current?.setValue(localStorage.getItem(path + "/" + language));
    if (localStorage.getItem(path + "/"))
      handleLanguageChange(null, localStorage.getItem(path + "/"));
  };

  const handleLanguageChange = (e, langu) => {
    // const code = editorRef?.current?.getValue();
    // localStorage.setItem(path + "/" + language, code);
    const lang = e?.target?.value || langu;
    monaco.editor.setModelLanguage(editorRef?.current?.getModel(), lang);
    setLanguage(lang);
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    setTimetaken("");
    setPlaygroundLoading && setPlaygroundLoading(true);
    if (setPlaygroundOutput) setPlaygroundOutput({ stdout: "", stderr: "" });
    const code = editorRef?.current?.getValue();
    const start = new Date();
    var res; //= await run(language, code);
    setTimeout(() => {
      res = { data: { stdout: "code", stderr: "", error: "" } };
    }, 2000);
    const time = (new Date() - start) / 1000.0;
    setTimetaken(time.toFixed(1));
    // console.log(timeTaken);
    setLoading(false);
    setPlaygroundLoading && setPlaygroundLoading(false);
    setOutput({
      ...res.data,
    });
    handleConsoleExpand(true);
    if (setPlaygroundOutput) setPlaygroundOutput(res.data);
  };

  const handleSettimer = () => {
    setTimerexpand(!timerexpand);
  };

  const handleConsoleExpand = (full) => {
    if (full === true) {
      splitRef.current.split.setSizes([50, 50]);
      return;
    }
    // console.log("sizes ", splitRef?.current?.split?.getSizes());
    if (!expand) splitRef.current.split.setSizes([50, 50]);
    else splitRef.current.split.setSizes([100, 0]);
    setExpand(!expand);
  };

  return (
    <div className="border rounded-xl overflow-x-hidden h-[92vh] bg-white">
      <div className="flex mx-2 justify-between">
        <select
          className="font-semibold w-24 mb-2 bg-slate-100 duration-300 focus:ring-0"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="python">Python</option>
          <option value="r">R</option>
          <option value="ruby">Ruby</option>
          <option value="swift">Swift</option>
        </select>

        <div className="my-auto font-bold flex">
          {!timerexpand && (
            <MdOutlineTimer
              className="mt-1 hover:cursor-pointer"
              onClick={handleSettimer}
            />
          )}
          {timerexpand && (
            <div className="flex my-auto">
              <FaAngleLeft
                className="mt-1 hover:cursor-pointer"
                onClick={handleSettimer}
              />
              <Timer closeTimer={handleSettimer} />
            </div>
          )}
        </div>
        <div
          className="my-auto"
          onClick={() => {
            setFullscreen(!fullScreen), setEditorFullscreen();
          }}
        >
          {fullScreen ? (
            <MdFullscreenExit className="mr-2 w-5 h-5 cursor-pointer" />
          ) : (
            <MdFullscreen className="mr-2 w-5 h-5 cursor-pointer" />
          )}
        </div>
      </div>
      <Split
        ref={splitRef}
        className="h-[calc(100vh-36px-13vh)] overflow-y-hidden"
        direction="vertical"
        gutterSize={5}
        minSize={0}
        sizes={[100, 0]}
      >
        <div className="w-full">
          <Editor
            width="100%"
            height="100%"
            defaultLanguage="cpp"
            defaultValue="// Write your code here"
            onMount={handleEditorDidMount}
            // theme="light-dark"
          />
        </div>
        <div className="">
          <div className="px-4 flex gap-3 border-b ">
            <p className="py-1 text-sm">TestCase</p>
            <p className="py-1 text-sm border-b border-black">Output</p>
          </div>
          <div
            className="m-1 p-1 overflow-scroll h-full"
            style={{ overflowWrap: "break-word" }}
          >
            {output.stdout && (
              <div className="border rounded-md p-1 border-lime-400">
                {output.stdout.split("\n").map((ele, ind) => (
                  <p key={ind}>{ele}</p>
                ))}
              </div>
            )}
            {output.stderr && (
              <div className="p-1 rounded-md text-red-500 bg-red-700 bg-opacity-25">
                {output.stderr.split("\n").map((ele, ind) => (
                  <p key={ind}>{ele}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </Split>
      <div className="h-9 border-t px-2 flex justify-between">
        <button className="flex my-auto " onClick={handleConsoleExpand}>
          Console
          {expand ? (
            <MdExpandMore className="m-1" />
          ) : (
            <MdExpandLess className="m-1" />
          )}
        </button>
        <div className="flex gap-3">
          <button
            className="my-auto px-4 rounded-md font-semibold text-white bg-gray-400 hover:bg-gray-500 disabled:opacity-35 disabled:cursor-not-allowed"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? "Running..." : "Run"}
          </button>
          <button className="px-4 my-auto rounded-md font-semibold text-white bg-green-600 hover:bg-green-500">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;

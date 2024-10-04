import Editor from "@monaco-editor/react";
import React, { useContext, useRef, useState } from "react";
import Split from "react-split";
import { FaCaretDown } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import useRunCode from "../hooks/useRunCode";
import OutputCard from "./OutputCard";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SubmitCode } from "../../graphQL/Mutations";
import { PasteCodePopUp } from "./popUps/PopUps";
import useCodePersistance from "../hooks/useCodePersistance";
import { UserContext } from "../context/User";

const EditorCode = ({ examples, setSubmissions }) => {
  const { user } = useContext(UserContext);
  const [run, data, error, loading] = useRunCode();
  const [submitCode, { data: sdata, loading: sloading, error: serror }] =
    useMutation(SubmitCode);
  const [height, setHeight] = useState("0");
  // const warningRef = useRef(null);
  const selectorRef = useRef(null);
  const editorRef = useRef(null);
  const splitRef = useRef(null);
  const { problemId, contestURL } = useParams();
  const [popUp, setPopUp] = useState(false);

  const { code, setCode, language, setLanguage } =
    useCodePersistance(editorRef);

  const handleRun = async () => {
    const size = splitRef?.current?.split?.getSizes();
    if (size[1] < 1) splitRef.current.split.setSizes([30, 70]);
    const res = run({ variables: { input: { language, code, problemId } } });
  };
  const handleSubmit = async () => {
    const size = splitRef?.current?.split?.getSizes();
    if (size[1] < 1) splitRef.current.split.setSizes([30, 70]);
    const res = await submitCode({
      variables: {
        input: { language, code, problemId, contestUrl: contestURL },
      },
    });
    const submitted = res?.data?.submitCode;
    if (submitted) setSubmissions((prev) => [submitted, ...prev]);
  };

  const handleConsoleExpand = () => {
    const size = splitRef?.current?.split?.getSizes();
    if (size[1] < 1) splitRef.current.split.setSizes([40, 60]);
    else splitRef.current.split.setSizes([100, 0]);
  };

  const handleLan = (e) => {
    setLanguage(e.target.innerHTML);
    setHeight("0");
  };
  const handleSelecor = () => {
    if (height == "0") setHeight("[100%]");
    else setHeight("0");
  };
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const handleContent = (e, editor) => {
    if (e.length <= code.length + 15 || code.indexOf(e) != -1) setCode(e);
    else {
      editorRef.current.setValue(code);
      setPopUp(true);
      // warningRef.current.classList.remove("-top-full");
      // warningRef.current.classList.add("top-8");
      // setTimeout(() => {
      //   warningRef.current.classList.add("-top-full");
      //   warningRef.current.classList.remove("top-8");
      // }, 2500);
    }
  };
  return (
    <div className="h-full overflow-hidden  flex flex-col p-2 m-2 ml-0 border rounded-lg border-gray-300 text-gray-900">
      {popUp && <PasteCodePopUp setPopUp={setPopUp} />}
      <div className="flex justify-between h-fit">
        <div className="relative px-4 py-1 bg-slate-200 min-w-32 rounded-lg">
          <div
            className="flex items-center gap-3 justify-between font-semibold cursor-pointer"
            onClick={handleSelecor}
          >
            <h1>{language}</h1>
            <FaCaretDown />
          </div>
          {height != "0" && (
            <ul
              ref={selectorRef}
              className="max-h-56 overflow-y-scroll absolute z-[10] bg-white overflow-hidden w-full top-full left-0 text-center cursor-pointer border z-100 flex flex-col"
            >
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                cpp
              </li>
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                c
              </li>
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                python
              </li>
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                java
              </li>
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                javascript
              </li>
              <li
                className=" py-2 hover:bg-neutral-100 border-b"
                onClick={handleLan}
              >
                ruby
              </li>
              <li className=" py-2 hover:bg-neutral-100 " onClick={handleLan}>
                r
              </li>
            </ul>
          )}
        </div>
      </div>
      <Split
        ref={splitRef}
        className="h-full overflow-y-hidden flex flex-col"
        direction="vertical"
        gutterSize={8}
        minSize={0}
        sizes={[100, 0]}
      >
        <div className=" bg-white">
          <Editor
            className="z-0"
            height={"100%"}
            language={language}
            value={code}
            onMount={handleEditorDidMount}
            onChange={handleContent}
            min
            options={{
              minimap: { enabled: false },
              selectOnLineNumbers: true,
              quickSuggestions: {
                other: false,
                comments: false,
                strings: false,
              },
              parameterHints: {
                enabled: false,
              },
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
              tabCompletion: "off",
              wordBasedSuggestions: false,
            }}
          />
        </div>
        <OutputCard
          data={data}
          error={error}
          loading={loading}
          examples={examples}
        />
      </Split>
      <div className="border-t h-fit">
        <div className="flex justify-between items-center p-1">
          <button
            className="flex bg-neutral-200 gap-3 rounded-lg px-4 py-1 items-center"
            onClick={handleConsoleExpand}
          >
            <h1 className="font-semibold"> console</h1>
            <BiSolidUpArrow className="size-3" />
          </button>
          <div className="flex flex-row-reverse gap-4 text-white font-semibold">
            <button
              className="px-4 py-1 bg-green-500 rounded-lg"
              onClick={handleRun}
            >
              {loading ? "Loading..." : "Run"}
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-1 bg-gray-500 rounded-lg disabled:cursor-not-allowed disabled:opacity-30"
              disabled={!user?.id}
            >
              {sloading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorCode;

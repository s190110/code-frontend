import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodesContest from "../context/Codes";

const useCodePersistance = (editorRef) => {
  const { contestURL, problemId } = useParams();
  const { codes, setCodes } = useContext(CodesContest);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("//write ur code here");

  useEffect(() => {
    const location = `${contestURL || ""}/${problemId}/${language}`;
    const prevCodeInd = codes.findIndex((ele) => ele.location == location);
    if (prevCodeInd != -1) {
      setCode(codes[prevCodeInd].code);
      //   editorRef?.current?.setValue(codes[prevCodeInd].code);
    }
    return () => {
      const location = `${contestURL || ""}/${problemId}/${language}`;
      const prevCodeInd = codes.findIndex((ele) => ele.location == location);
      var ncode = codes.map((ele) => ({ ...ele }));
      if (prevCodeInd != -1)
        ncode[prevCodeInd].code = editorRef.current?.getValue();
      else ncode.push({ code: editorRef.current?.getValue(), location });
      setCodes(ncode);
    };
  }, [language, contestURL, problemId, editorRef]);
  return { code, setCode, language, setLanguage };
};

export default useCodePersistance;

// const useCodePersistanceLocal = (code, language, setCode, editorRef) => {
//   const { contestURL, problemId } = useParams();
//   //   Set code to localstorage
//   useEffect(() => {
//     return () => {
//       if (contestURL)
//         localStorage.setItem(`/${contestURL}/${problemId}/${language}`, code);
//       else {
//         localStorage.setItem(`/latest/${language}`, code);
//       }
//       console.log("lang: ", language);
//     };
//   }, [code, language]);
//   //   get Code from localstorage if avilable
//   useEffect(() => {
//     let localCode = "";
//     if (contestURL)
//       localCode = localStorage.getItem(
//         `/${contestURL}/${problemId}/${language}`
//       );
//     else localCode = localStorage.getItem(`/latest/${language}`);
//     if (localCode) {
//       setCode(localCode);
//       console.log(localCode);
//       editorRef.current?.setValue(code);
//     }
//     console.log(language);
//   }, [language, editorRef.current, setCode]);
// };

// export default useCodePersistance;

import React from "react";
import MDEditor from "@uiw/react-md-editor";

const DisplayCode = ({ code, language }) => {
  return (
    <div className="" data-color-mode="light">
      <h1 className="pt-5 text-sm text-neutral-700">Code | {language}</h1>
      <MDEditor.Markdown source={`\`\`\`${language}\n${code}`}/>
    </div>
  );
};

export default DisplayCode;

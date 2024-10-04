import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Split from "react-split";
import useGetProblem from "../hooks/useGetProblem";
import EditorCode from "./EditorCode";
import Description from "./Description";
import useGetProblemSubmissions from "../hooks/useGetProblemSubmissions";

const SolveProblem = () => {
  const { problemId } = useParams();
  const { data, error, loading } = useGetProblem(problemId);
  const [submissions, setSubmissions] = useGetProblemSubmissions(problemId);
  const splitReff = useRef(null);
  const navigate = useNavigate();
  if (error) navigate("/pageNotFound");
  return (
    <Split
      ref={splitReff}
      className="flex h-full w-full overflow-hidden text-black"
      sizes={[40, 60]}
      minSize={0}
      gutterSize={8}
      gutterAlign="center"
      direction="horizontal"
      cursor="col-resize"
    >
      <Description data={data} submissions={submissions} loading={loading} />

      <div className="h-full">
        <EditorCode
          examples={data?.problem?.examples}
          setSubmissions={setSubmissions}
        />
      </div>
    </Split>
  );
};

export default SolveProblem;

import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GetProblem } from "../../graphQL/Quary";

const useGetProblem = (problemId) => {
  const [getProblem, { data, error, loading }] = useLazyQuery(GetProblem);
  useEffect(() => {
    const start = async () => {
      const res = await getProblem({ variables: { getProblemId: problemId } });
    };
    if (problemId) start();
  }, [problemId]);
  return { data, error, loading };
};

export default useGetProblem;

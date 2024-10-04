import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GetProblemSubmissions } from "../../graphQL/Quary";

const useGetProblemSubmissions = (problemId) => {
  const [submissions, setSubmissions] = useState([]);
  const [getSubmissions, { data, error, loading }] = useLazyQuery(
    GetProblemSubmissions,
    { fetchPolicy: "no-cache" }
  );
  useEffect(() => {
    const start = async () => {
      const res = await getSubmissions({ variables: { problemId } });
      setSubmissions(res?.data?.submissions || []);
    };
    start();
  }, [problemId]);
  return [submissions, setSubmissions];
};

export default useGetProblemSubmissions;

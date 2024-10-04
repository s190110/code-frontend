import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GetContestProblems } from "../../graphQL/Quary";

const useGetContestProblems = (contestURL) => {
  const [getContestProblems, { data, loading, error }] =
    useLazyQuery(GetContestProblems);
  useEffect(() => {
    getContestProblems({
      variables: { contestUrl: contestURL },
      fetchPolicy: "no-cache",
    });
  }, [contestURL]);
  return { contest: data?.contest || {}, error };
};

export default useGetContestProblems;

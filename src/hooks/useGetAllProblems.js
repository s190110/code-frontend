import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GetAllProblems } from "../../graphQL/Quary";

const useGetAllProblems = (page) => {
  const [getProbelms, { data, error, loading }] = useLazyQuery(GetAllProblems);
  useEffect(() => {
    const start = async () => {
      await getProbelms({ variables: { pagination: { page } } });
    };
    start();
  }, [page]);
  return [data, error, loading];
};

export default useGetAllProblems;

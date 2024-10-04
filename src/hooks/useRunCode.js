import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { RunCode } from "../../graphQL/Quary";

const useRunCode = () => {
  const [run, { data, error, loading }] = useLazyQuery(RunCode);
  return [run, data, error, loading];
};

export default useRunCode;

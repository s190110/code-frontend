import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GetContests } from "../../graphQL/Quary";

const useGetContests = () => {
  const [allContests, setAllContests] = useState({
    upComing: [],
    registered: [],
    pastParticipated: [],
  });
  const { data, error, loading } = useQuery(GetContests, {
    onCompleted: ({ contests }) => {
      setAllContests(contests);
    },
  });
  return allContests;
};

export default useGetContests;

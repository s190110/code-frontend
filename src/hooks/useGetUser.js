import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetUser } from "../../graphQL/Quary";

const useGetUser = () => {
  const [user, setUser] = useState("");
  const [getuser, { loading }] = useLazyQuery(GetUser);
  useEffect(() => {
    const start = async () => {
      const res = await getuser();
      //   console.log(res.data);
      setUser(res?.data?.user);
    };
    start();
  }, []);
  return { user, setUser, loading };
};

export default useGetUser;

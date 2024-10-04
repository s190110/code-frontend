import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { FaUser } from "react-icons/fa6";
import { useMutation } from "@apollo/client";
import { editProfile } from "../../graphQL/Mutations";

const Edit = () => {
  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState(user);
  const [editProfilee, { data: udata, loading }] = useMutation(editProfile);
  const handleSave = async () => {
    const {
      id,
      firstName,
      lastName,
      userName,
      profileLink,
      linkedinLink,
      githubLink,
      instagramLink,
      portfolioLink,
    } = data;
    const res = await editProfilee({
      variables: {
        input: {
          id,
          firstName,
          lastName,
          userName,
          profileLink,
          linkedinLink,
          githubLink,
          instagramLink,
          portfolioLink,
        },
      },
    });
    if (res.data?.user) setUser({ ...data, ...res.data.user });
  };
  return (
    <div className="bg-[#f7f8fa]">
      <div className="bg-gradient-to-b from-gray-800 to-gray-500 h-[50vh]  flex gap-20">
        <div className="rounded-3xl  bg-gray-300 p-2 border-[8px] border-slate-100 group h-fit ml-20 mt-10">
          <FaUser className="size-36 group-hover:opacity-35" color="gray" />
        </div>
        <label className="font-semibold text-gray-900 mt-32">
          {user.userName || user.firstName}
        </label>
      </div>
      <div className="w-full flex justify-center text-gray-600">
        <div className="md:w-1/2 w-full mx-10 bg-white shadow-lg h-fit mb-10 -my-32 rounded-2xl p-4">
          <label className="font-semibold text-center p-4 text-xl">Basic Info</label>
          <Comp name={"firstName"} data={data} setData={setData} />
          <Comp name={"lastName"} data={data} setData={setData} />
          <Comp name={"userName"} data={data} setData={setData} />
          <Comp name={"githubLink"} data={data} setData={setData} />
          <Comp name={"linkedinLink"} data={data} setData={setData} />
          <Comp name={"portfolioLink"} data={data} setData={setData} />
          <div className="flex flex-row-reverse w-full">
            <button
              className="py-1.5 px-4 m-4 rounded-md bg-sky-500 bg-opacity-60 text-white disabled:opacity-40"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Loading" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Comp = ({ name, data, setData }) => {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState("");
  useEffect(() => {
    setVal(data[name]);
  }, [name]);
  const onCancel = () => {
    setEdit(false);
  };
  const onsave = () => {
    const ndata = { ...data };
    ndata[name] = val;
    setData(ndata);
    setEdit(false);
  };
  return (
    <>
      <div className="flex justify-between py-3">
        <label className="text-gray-700">{name}</label>
        {!edit && <span>{data[name]}</span>}
        {edit && (
          <input
            className="appearance-none focus:outline-none outline-none border focus:border-blue-300 py-1.5 px-4 bg-transparent"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        )}
        <label
          className="text-md text-sky-500 font-semibold"
          onClick={() => setEdit(true)}
        >
          Edit
        </label>
      </div>
      {edit && (
        <div className="flex gap-6 justify-center mb-4">
          <button
            className="py-1.5 px-4 rounded-md bg-sky-400 bg-opacity-60"
            onClick={onsave}
          >
            save
          </button>
          <button
            className="py-1.5 px-4 rounded-md bg-slate-200 bg-opacity-60"
            onClick={onCancel}
          >
            cancel
          </button>
        </div>
      )}
      <hr />
    </>
  );
};

export default Edit;

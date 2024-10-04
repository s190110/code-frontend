import React, { useContext } from "react";
import { UserContext } from "../context/User";
import { NavLink } from "react-router-dom";
import { HiMiniUserCircle } from "react-icons/hi2";
import { IoMdExit } from "react-icons/io";
import { TbLoaderQuarter } from "react-icons/tb";

const Header = () => {
  const { user, setUser, loading } = useContext(UserContext);
  return (
    <div className="z-[20] p-2 flex justify-between items-center h-fit bg-white shadow-lg text-sky-500 sticky top-0">
      <NavLink to={"/"} className="h-full">
        <img src="/images/new_logo.jpg" className="object-contain h-11" />
      </NavLink>
      <div className="flex gap-6 items-center font-semibold">
        <NavLink to={"/contest"}>Contest</NavLink>
        <NavLink to={"/playground"}>PlayGround</NavLink>
        <NavLink to={"/problems"}>Problems</NavLink>
        {user ? (
          <div className="group relative">
            <NavLink to={"/Profile"}>
              <HiMiniUserCircle color="#7B68EE" className="size-10" />
            </NavLink>
            <Menu user={user} setUser={setUser} />
          </div>
        ) : (
          <NavLink
            to={"/login"}
            className="bg-sky-400 bg-opacity-25 px-4 py-2 rounded-md font-semibold"
          >
            {loading ? (
              <div className="animate-spin">
                <TbLoaderQuarter className="animate-spin" />
              </div>
            ) : (
              "Register/Login"
            )}
          </NavLink>
        )}
      </div>
    </div>
  );
};
const Menu = ({ user, setUser }) => {
  return (
    <div className="hidden absolute z-10 p-4 min-w-56 h-fit border-gray-200 border group-hover:flex right-0 top-full bg-white cursor-pointer flex-col gap-1 font-normal text-neutral-600 rounded-lg shadow-md">
      <NavLink
        to={"/profile"}
        className="flex justify-center gap-2 items-center rounded-md"
      >
        <HiMiniUserCircle className="size-20" />
        <h1>{user.userName || user.firstName}</h1>
      </NavLink>
      <NavLink
        to={"/profile/allsubmissions"}
        className="p-2 hover:bg-neutral-300 rounded-md"
      >
        All Submitions
      </NavLink>
      <NavLink
        to={"/contest/create"}
        className="p-2 hover:bg-neutral-300 rounded-md"
      >
        Organise Contest
      </NavLink>
      <NavLink to={"/contest"} className="p-2 hover:bg-neutral-300 rounded-md">
        Join Contest
      </NavLink>
      <NavLink
        to={"/addProblem"}
        className="p-2 hover:bg-neutral-300 rounded-md"
      >
        Add problem
      </NavLink>
      <NavLink
        to={"/organised"}
        className="p-2 hover:bg-neutral-300 rounded-md"
      >
        manage Contest
      </NavLink>
      <div
        className="flex gap-4 items-center p-2 hover:bg-neutral-300 rounded-md"
        onClick={() => {
          setUser("");
          localStorage.removeItem("token");
        }}
      >
        <IoMdExit className="size-7" />
        <h1>Logout</h1>
      </div>
    </div>
  );
};

export default Header;

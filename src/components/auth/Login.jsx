import React, { useContext, useEffect, useState } from "react";
import { PiTextbox } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { UserContext } from "../../context/User";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { registerUser } from "../../../graphQL/Mutations";
import { LoginUser } from "../../../graphQL/Quary";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({ userName: "", email: "", password: "" });
  const [register, { data: rdata, error: rerror, loading: rloading }] =
    useMutation(registerUser, { onError: (ex) => {} });
  const [login, { data: ldata, loading: lloading, error: lerror }] =
    useLazyQuery(LoginUser);
  useEffect(() => {
    if (user) navigate(-1);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    var ndata = { ...data };
    ndata[name] = value;
    setData(ndata);
  };
  const handleUser = (newUser) => {
    setData({ userName: "", email: "", password: "" });
    setNewUser(newUser);
    setError("");
  };
  const validate = (email, password) => {
    // Validate email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    // Validate password length
    const isValidPassword = password.length >= 4;

    // Check for validation errors and return appropriate messages
    if (!isValidEmail) {
      return "Invalid email format.";
    } else if (!isValidPassword) {
      return "Password must be at least 4 characters long.";
    } else {
      return null;
    }
  };

  const handleLogin = async () => {
    const validerror = validate(data.email, data.password);
    if (validerror) {
      setError(validerror);
      return;
    }
    var res;
    setError("");
    if (newUser) {
      if (data.userName.length <= 4) {
        setError("username must be of length altelast 4");
        return;
      }
      res = await register({ variables: { newUser: data } });
    } else
      res = await login({
        variables: { email: data.email, password: data.password },
      });

    if (res.errors) {
      const errorMessage =
        res?.errors?.[0]?.message ||
        res?.errors?.graphQLErrors?.[0]?.message ||
        "un Known";
      // console.log(errorMessage);
      setError(errorMessage);
    } else {
      const { token, user } = res.data.user;
      localStorage.setItem("token", token);
      setUser({ ...user });
    }
  };
  // setUser({ id: "123", name: "raghav", email: "raghav@gmail.com" });
  return (
    <>
      <div className="bg-light-bg h-screen w-full pt-8 bg-pattern">
        <div className="md:flex flex-row items-center justify-around container mx-auto">
          <div className="">
            <h1 className="text-gray-700 text-3xl font-semibold py-4">
              Sign up on Code Here
            </h1>
            <h2 className="text-gray-500 text-2xl font-semibold py-4">
              Access your account or get started with us
            </h2>
            <div className="flex gap-4">
              <span onClick={() => handleUser(false)}>
                <Button data="Login" selected={!newUser} />
              </span>
              <span onClick={() => handleUser(true)}>
                <Button data="Sign Up" selected={newUser} />
              </span>
              <span>
                <Button data="For Organisations" selected={false} />
              </span>
            </div>

            {error && <h1 className="text-red-700 mt-4">{error}</h1>}
            <div className="bg-form bg-opacity-10 my-5">
              {newUser && (
                <Input
                  handleChange={handleChange}
                  data={data}
                  placeholder="User Name"
                  type="text"
                  name="userName"
                  Logo={PiTextbox}
                />
              )}
              <Input
                handleChange={handleChange}
                data={data}
                placeholder="Email"
                type="email"
                name="email"
                Logo={MdOutlineEmail}
              />
              <Input
                handleChange={handleChange}
                data={data}
                placeholder="Password"
                type="password"
                name="password"
                Logo={MdOutlinePassword}
              />
            </div>
            <div onClick={handleLogin}>
              <Button
                data={
                  rloading || lloading
                    ? "Loding..."
                    : newUser
                    ? "Create Account"
                    : "Login"
                }
                selected={true}
              />
            </div>
          </div>
          <img src="/images/login1.png" className="hidden md:block" />
        </div>
      </div>
    </>
  );
};

const Button = ({ data, selected }) => (
  <button
    className={`px-6 py-4 border-2 border-sky-500 font-semibold ${
      selected ? "bg-sky-500 text-white" : "text-sky-500"
    }`}
  >
    {data}
  </button>
);
const Input = ({ type, Logo, placeholder, name, handleChange, data }) => (
  <div className="flex p-5 bg-form gap-4 items-center">
    <Logo color="gray" />
    <input
      name={name}
      value={data[name]}
      type={type}
      className="appearence-none outline-0 w-full bg-form text-black"
      placeholder={placeholder}
      onChange={handleChange}
    />
  </div>
);

export default Login;

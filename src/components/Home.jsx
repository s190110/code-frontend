import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="md:h-[90dvh] flex flex-col relative select-none ">
      <div className="text-2xl text-red-500 w-full h-full min-h-[500px] flex justify-center md:justify-between items-center">
        <img
          src="/images/langLeft.png"
          className="w-1/5 object-contain md:grid hidden"
        />
        <img
          src="/images/learn-animation.gif"
          className="md:w-1/5 w-1/2 object-contain shadow-lg"
        />
        <img
          src="/images/langRight.png"
          className="w-1/5 object-contain md:grid hidden"
        />
      </div>
      <div
        className="absolute bottom-0 w-full h-10 bg-gradient-to-r from-sky-400 to-blue-700"
        style={{ borderRadius: "49% 50% 10% 10% / 58% 60% 0% 3% " }}
      />
    </div>
  );
};

export default Home;

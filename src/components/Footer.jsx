import React from "react";

const Footer = () => {
  return (
    // <div>Footer</div>
    <div className=" bg-footer md:flex justify-between text-white md:p-8 p-2">
      <div className="md:grid grid-cols-3 gap-8">
        <h1 className="">Blog</h1>
        <h1 className="">Problems</h1>
        <h1 className="">contest</h1>
        <h1 className="">Terms</h1>
        <h1 className="">Privacy policy</h1>
        <h1 className="">Home</h1>
        <h1 className="">Contest</h1>
      </div>
      <div>
        <h1>facebook</h1>
        <h1>insta</h1>
        <h1>linkedin</h1>
      </div>
    </div>
  );
};

export default Footer;

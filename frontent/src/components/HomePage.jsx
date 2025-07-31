import React from "react";

const HomePage = () => {
  return (
    <div className="bg-neutral-100 flex justify-center items-center h-[90vh]">
      <h1 className="text-5xl font-mono text-slate-500 w-1/2 text-center font-semibold">
        Welcome to{" "}
        <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          Invoice
        </span>{" "}
        Generate Page
      </h1>
    </div>
  );
};

export default HomePage;

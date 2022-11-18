import React from "react";
import { Outlet } from "react-router-dom";

const InitialNavBar = () => {
  return (
    <>
      <div className="bg-zinc-800 sticky top-0 right-0 left-0">
        <div className="px-4 py-5 md:px-24 lg:px-8">
          <div className="relative flex items-center justify-center">
            <h1 className="text-gray-300 text-3xl font-jakarta font-bold">
              V.J. Consulting
            </h1>
          </div>
        </div>
      </div>
      {/* Route Nesting Outlet (Important!) */}
      <Outlet />
    </>
  );
};

export default InitialNavBar;

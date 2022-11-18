import React, { useState, useContext } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "./NavBarStyles.css";

//Axios
import axios from "axios";

//HamBurger import Using useContext
import { menuContext } from "../Hooks/MenuContext";

//Auth Details import Using useContext
import { authContext } from "../Hooks/AuthContext";

// React Icons
import { SiPhpmyadmin } from "react-icons/si";
import { GiSodaCan } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";

//Profile Button Import
import UserMenu from "../UserMenu/UserMenu";

const NavBar = () => {
  //HamBurger import Using useContext
  const { hamBurger, setHamBurger } = useContext(menuContext);
  const { authState } = useContext(authContext);

  //Insurance Product DropDown

  //Route track using useLocation
  const localpath = useLocation();
  const paths = localpath.pathname.split("/");
  const length = paths.length;
  const currentPath = paths[length - 1];

  const userRole = localStorage.getItem("userRole");

  return (
    <>
      {/* TopNav */}
      <div
        className={`sticky top-0 flex justify-between items-center bg-zinc-800 py-3 px-5 transition-all z-10 ${
          hamBurger ? "ml-24" : "ml-72"
        }`}
      >
        <div className="flex">
          <button
            onClick={() => setHamBurger(!hamBurger)}
            className="text-white mr-3 text-xl p-2 rounded-md transition-all"
          >
            {hamBurger ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-[100%] border-b-2 border-black text-gray-400 outline-none  hidden md:block py-2 px-3"
          />
        </div>
        <div>
          {/* Profile Button */}
          <UserMenu />
        </div>
      </div>

      {/* SideNav */}
      <div
        className={`fixed top-0 bottom-0 left-0 bg-zinc-800 transition-all ${
          hamBurger ? "w-24" : "w-72"
        }`}
      >
        <div className="logo flex justify-center items-center my-4">
          <h1 className="text-2xl text-white font-bold">
            <Link to="/" className="flex justify-center items-center">
              {hamBurger ? (
                <span className="p-2">V.J.</span>
              ) : (
                <span className="p-2">V.J. Consulting</span>
              )}
            </Link>
          </h1>
        </div>
        <nav className="mx-5">
          <ul>
            <li>
              <NavLink
                to="/"
                className="flex items-center text-white text-sm py-3 px-2 my-1 rounded-xl hover:bg-gray-700"
              >
                <RiDashboardLine className="mx-2 text-2xl" />
                {hamBurger ? null : "Dashboard"}
              </NavLink>
            </li>
            {authState && authState.role === "admin" ? (
              <li>
                <Link
                  to='/user-management'
                  className="flex items-center text-white text-sm py-3 px-2 my-1 rounded-xl hover:bg-gray-700"
                >
                  <SiPhpmyadmin className="mx-2 text-2xl" />
                  {hamBurger ? null : "User Management"}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      {/* Route Nesting Outlet (Important!) */}
      <Outlet />
    </>
  );
};

export default NavBar;

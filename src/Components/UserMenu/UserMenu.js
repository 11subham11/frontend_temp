import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//For Animation
import Transition from "./Transition";

//React Icons
import { BsChevronDown } from "react-icons/bs";

//Auth Details import Using useContext
import { authContext } from "../Hooks/AuthContext";

function UserMenu() {
  const navigate = useNavigate();

  //Auth Details import Using useContext
  const { authState, setAuthState } = useContext(authContext);

  //MenuDropDown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  //LogOut Fun...
  const handleLogOut = () => {
    setDropdownOpen(!dropdownOpen);
    setAuthState({ user:"", name: "", id: 0, email: "", status: false });
    localStorage.removeItem("authtoken");
    localStorage.removeItem("authState");
    navigate("/");
  };

  return (
    <div className="relative inline-flex bg-slate-700 py-2 px-3 rounded-md">
      {/* Menu Button */}
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <h2 className="text-white font-bold px-2">
          {authState && authState.name}
        </h2>
        <BsChevronDown className="text-md text-white" />
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {/* Menu DropDown Options */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="w-32 flex justify-center"
        >
          <ul>
            <li>
              <Link
                to={`/userprofile/${authState.id}`}
                onClick={() => {
                  setDropdownOpen(false);
                }}
                className="font-medium text-sm text-white hover:text-gray-400 flex items-center py-1 px-3"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setDropdownOpen(false);
                }}
                className="font-medium text-sm text-white hover:text-gray-400 flex items-center py-1 px-3"
                to={`/edituserprofile/${authState.id}`}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="font-medium text-sm text-white hover:text-gray-400 flex items-center py-1 px-3"
                onClick={handleLogOut}
              >
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;

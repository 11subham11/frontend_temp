import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";

//Axios
import axios from "axios";

//HamBurger import Using useContext
import { menuContext } from "../../Hooks/MenuContext";

//Auth Details import Using useContext
import { authContext } from "../../Hooks/AuthContext";
import PageNotFound from "../../../Pages/ErrorPage/ErrorPage";

const UserProfile = () => {
  //Auth Details import Using useContext
  const { authState } = useContext(authContext);
  

  //HamBurger import Using useContext
  const { hamBurger } = useContext(menuContext);

  const { id } = useParams();
  const UserId = parseInt(id);

  //Get Admin Details By Id
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (authState && authState.id === UserId) {
    //Compare Auth Id to useParams Id
    const fetchData = async () => {
      await axios
      .get(`http://localhost:5000/users/single/${UserId}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          window.alert(res.data.error);
        } else {
          setUserDetails(res.data);
        }
      })  
    };
    fetchData();
  }
     
  }, [authState , UserId]);

  return (
    <>
    {authState && authState.id === UserId ? (
    <div
      className={
        hamBurger
          ? "fixed top-[75px] right-[5px] left-[100px] transition-all"
          : "fixed top-[75px] right-[5px] left-[300px] transition-all"
      }
    >
      <div className="relative mt-52 mb-32 sm:mb-24 mx-auto w-1/2">
        <div className="rounded overflow-hidden shadow-md bg-white pb-20 border border-gray-100">
          <div className="absolute -mt-32 w-full flex justify-center">
            {/* Img Section */}
            <div className="h-52 w-52">
              <img
                src={`${URL}${userDetails && userDetails.data.picture}`}
                alt="Admin"
                className="rounded-full object-cover h-full w-full shadow-md"
              />
            </div>
          </div>
          {/* Admin Details Section */}
          <div className="px-6 mt-20">
            <div className="font-bold text-4xl text-center pb-1">
              {userDetails && userDetails.data.firstName}{" "}
              {userDetails && userDetails.data.lastName}
            </div>
            <p className="text-gray-800 text-md text-center">
              Email: {userDetails && userDetails.data.email}
            </p>
            <p className="text-gray-800 text-md text-center">
              Phone: {userDetails && userDetails.data.phone}
            </p>
            <p className="text-gray-800 text-md text-center">Role: {userDetails && userDetails.data.role}</p>
          </div>
        </div>
      </div>
    </div>
    ) : (<><PageNotFound/></>)}
    </>
  );
};

export default UserProfile;

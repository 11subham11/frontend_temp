import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

//Axios import
import axios from "axios";

//Context Import
import { authContext } from "./Components/Hooks/AuthContext";
import { menuContext } from "./Components/Hooks/MenuContext";
import { MobileContext } from "./Components/Hooks/MobileContext";

//Signin & Register
import SignIn from "./Pages/Auth/SignIn/SignIn";
import Register from "./Pages/Auth/SignUp/Register";

//NavBar
import NavBar from "./Components/NavBar/NavBar";

// SignIn Page NavBar
import InitialNavBar from "./Components/NavBar/InitialNavBar";

//Pages
import DashBoard from "./Pages/DashBoard/DashBoard";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";

//Admins
import UserDetails from "./Pages/UserManagement/UserDetails";
import UserProfile from "./Components/Users/UserProfile/UserProfile";
import EditUserProfile from "./Components/Users/UserProfile/EditUserProfile";
import UserManagement from "./Pages/UserManagement/UserManagement";

function App() {
  //Token For Route protect
  const token = localStorage.getItem("authtoken");
  const storageAuthState = JSON.parse(localStorage.getItem("authState"));
  let initialState = {
    role: "",
    email: "",
    id: 0,
    name:"",
    status: false,
  }
  if (storageAuthState) {
    initialState ={
      role: storageAuthState.role,
      email: storageAuthState.email,
      id: storageAuthState.id,
      name: storageAuthState.name,
      status: true,
    }
  }
  const [authState, setAuthState] = useState(initialState);
  //intial Auth Details
  console.log(authState);
 
  
  //HamBurger Menu
  const [hamBurger, setHamBurger] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  //Check Authentication Status
  useEffect(() => {
    window.scrollTo(0, 0);
    const user = async () => {
      const userLog = await axios.get("http://localhost:5000/users/auth", {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      });
        if (userLog.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
           setAuthState({
            role: userLog.data.role,
            email: userLog.data.email,
            id: userLog.data.id,
            name: userLog.data.name,
            status: true,
          });         
        }
      }
      user();
  }, []);


  return (
    <>
      <authContext.Provider value={{ authState, setAuthState }}>
        <menuContext.Provider value={{ hamBurger, setHamBurger }}>
          <MobileContext.Provider value={{ isMobile, setIsMobile }}>
            <Routes>
              {!token ? (
                //Before User Not Login
                <>
                  <Route path="/" element={<InitialNavBar />}>
                    <Route path="/Register" element={<Register />} />
                    <Route path="/" element={<SignIn />} />
                  </Route>
                </>
              ) : (
                //After User Login

                // Common For All
                <Route path="/" element={<NavBar />}>

                  {/* Pages */}
                  <Route path="/" element={<DashBoard />} />

                  {/* Admins Routes Only */}
                  {authState && authState.role === "admin" ? 
                  <Route
                    path="/user-management"
                    element={<UserManagement />}
                  /> : null }

                  <Route path="/userprofile/:id" element={<UserProfile />} />
                  <Route
                    path="/edituserprofile/:id"
                    element={<EditUserProfile />}
                  />
                  <Route path="/get-admin/:id" element={<UserDetails />} />

                </Route>
              )}
              {/* Error Page */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </MobileContext.Provider>
        </menuContext.Provider>
      </authContext.Provider>
    </>
  );
}

export default App;

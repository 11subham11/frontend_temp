import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignInStyles.css";

//Axios
import axios from "axios";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//Auth Details import Using useContext
import { authContext } from "../../../Components/Hooks/AuthContext";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  //Auth Details import Using useContext
  const { setAuthState } = useContext(authContext);

  return (
    <>
      <div className="relative w-full h-full py-40 min-h-screen background">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl sm:text-xl text-[#374151] uppercase tracking-widest size">
            Login to your Account
          </h1>
        </div>
        {/* Contact Form*/}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .required("Please enter your email")
              .email("Please enter a valid email"),
            password: yup
              .string()
              .required("Password is Required")
          })}
          //Form Data Submit Fun..
          onSubmit={async (values) => {
              await axios
                .post("http://localhost:5000/users/login", {
                  values,
                })
                .then((res) => {
                  //API call successfull
                  if (res.data.error) {
                    toast.error(res.data.error);
                  } else {
                    localStorage.setItem("authtoken", res.data.token);
                    localStorage.setItem('authState' ,JSON.stringify({
                      role: res.data.role,
                      email: res.data.email,
                      id: res.data.id,
                      name: res.data.name,
                      status: true,
                    }))
                    setAuthState({
                      role: res.data.role,
                      email: res.data.email,
                      name: res.data.name,
                      id: res.data.id,
                      status: true,
                    });
                    toast.success("Login Success");
                    navigate("/");
                  }
                })
                .catch((error) => {
                  // API call failed
                  window.alert(error);
                });
            }
          }
        >
          {({ isSubmitting, values, ...props }) => {
            return (
              <>
                <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#374151] border-0">
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <Form>
                            {/* Email Field */}
                            <div className="relative w-full mb-3 mt-16">
                              <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                                Email
                              </h3>
                              <Field
                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Enter your Email"
                              />
                              <p className="text-red-700 center font-normal">
                                <ErrorMessage name="email" />
                              </p>
                            </div>

                            {/* Password Field */}
                            <div className="relative w-full mb-6">
                              <h3 className="block uppercase text-gray-300 text-xs font-bold mb-2">
                                Password
                              </h3>
                              <Field
                                className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="Enter your Password"
                              />
                              <p className="text-red-700 center font-normal">
                                <ErrorMessage name="password" />
                              </p>
                            </div>

                            {/* Submit button */}
                            <div className="text-center my-6">
                              <button
                                className="bg-green-500 hover:bg-green-700 text-white active:bg-green-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="submit"
                              >
                                Sign In
                              </button>
                            </div>
                            <ul className="flex flex-wrap my-6 relative">
                              <li className="w-1/2">
                                <Link
                                  to="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                  className="text-gray-300 hover:text-gray-500 active:text-gray-700"
                                >
                                  <p>Forgot password?</p>
                                </Link>
                              </li>
                              <li className="w-1/2 text-right">
                                <Link
                                  to="/Register"
                                  className="text-gray-300 hover:text-gray-500 active:text-gray-700"
                                >
                                  <p>Create new account</p>
                                </Link>
                              </li>
                            </ul>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default SignIn;

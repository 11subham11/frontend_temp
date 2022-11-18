import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./SignUpStyles.css";

//Axios
import axios from "axios";

//Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//for React Select
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Register = () => {
  //For Navigate to Another Page
  const navigate = useNavigate();

  //For Admin Role
  const [roles, setRoles] = useState();



  //Form Data Post Fun...
  const makeRequest = (data) => {
    axios.post("http://localhost:5000/users/register", data).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(res.data.message);
        navigate("/");
      }
    }).catch((error) => {
      // API call failed
      window.alert(error);
    });
  };

  //Admin Role Static Data
  const selectRoles = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ];

  //For Admin Role set
  const handleSelect = (data) => {
    setRoles(data);
    console.log(data);
  };

  return (
    <>
      <div className="relative w-full h-full py-16 min-h-screen bg">
        <div className="text-center mb-4">
          <h1 className="font-bold text-2xl sm:text-xl text-[#374151] uppercase tracking-widest style">
            Register your Profile
          </h1>
        </div>
        {/* Contact Form*/}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required("Please enter your firstname"),
            lastName: yup.string().required("Please enter your lastname"),
            email: yup
              .string()
              .required("Please enter your email")
              .email("Please enter a valid email"),
            phone: yup.number().required("Please Enter your Number"),
            password: yup
              .string()
              .required("Password is Required")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
              ),
          })}
          onSubmit={(values) => {
            values.role = roles.value
            console.log(values);
              makeRequest(values);
            }
          }
        >
          {({ isSubmitting, setFieldValue, values, ...props }) => {
            return (
              <Form>
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 gap-x-8 w-2/5 p-6 h-75 backdrop-blur-md bg-white/10">
                    <div className="grid gap-y-5">
                      {/* Name field */}
                      <div className="grid grid-cols-2 gap-x-3">
                        {/* First Name */}
                        <div>
                          <h3 className="text-white">FirstName</h3>
                          <Field
                            className="w-full p-2 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            id="firstName"
                            type="firstName"
                            name="firstName"
                            placeholder="Enter your first Name"
                            required
                          />
                          <p className="text-red-500 center font-normal">
                            <ErrorMessage name="firstName" />
                          </p>
                        </div>

                        {/* Last Name */}
                        <div>
                          <h3 className="text-white">LastName</h3>
                          <Field
                            className="w-full p-2 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            type="lastName"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter your lastName"
                            required
                          />
                          <p className="text-red-500 center font-normal">
                            <ErrorMessage name="lastName" />
                          </p>
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <h3 className="text-white">Email</h3>
                        <Field
                          className="w-full p-2 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter your Email"
                        />
                        <p className="text-red-500 center font-normal">
                          <ErrorMessage name="email" />
                        </p>
                      </div>

                      {/* Password Field */}
                      <div>
                        <h3 className="text-white">Password</h3>
                        <Field
                          className="w-full p-2 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                          id="password"
                          type="password"
                          name="password"
                          autoComplete="off"
                          placeholder="Enter your Password"
                        />
                        <p className="text-red-500 center font-normal">
                          <ErrorMessage name="password" />
                        </p>
                      </div>

                      {/* Phone Number Field */}
                      <div>
                        <h3 className="text-white">Enter your Number</h3>
                        <Field
                          className="w-full p-2 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                          id="phone"
                          type="phone"
                          name="phone"
                          placeholder="Enter your number"
                        />
                        <p className="text-red-500 center font-normal">
                          <ErrorMessage name="phone" />
                        </p>
                      </div>
                    {/* Admin Role Select */}
                    <Select
                      options={selectRoles}
                      onChange={handleSelect}
                      components={animatedComponents}
                      name="role"
                      placeholder="Roles"
                    />
                    <div className="grid gap-y-4 mt-7">
                      {/* Submit button */}
                      <button
                        type="submit"
                        className="group uppercase relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-red-400 hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Register
                      </button>
                    </div>
                    
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={5000}
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

export default Register;

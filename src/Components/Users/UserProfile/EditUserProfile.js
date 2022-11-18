import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";

//Axios
import axios from "axios";

//Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

//Auth Details import Using useContext
import { authContext } from "../../Hooks/AuthContext";
import PageNotFound from "../../../Pages/ErrorPage/ErrorPage";

const EditUserProfile = () => {
  //Auth Details import Using useContext
  const { authState, setAuthState } = useContext(authContext);

  const { id } = useParams();
  const UserId = parseInt(id)
  const navigate = useNavigate();

  //Get Admin Details By Id
  const [userData, setUserData] = useState();

  useEffect(() => {
    //Compare Auth Id to useParams Id
    if (authState && authState.id === UserId) {
      const fetchData = async() => {
        await axios
        .get(`http://localhost:5000/users/single/${UserId}`, {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((error) => {
          // API call failed
          window.alert(error);
        });
      }
      fetchData();      
    } 
  }, [authState , UserId]);

  return (
    <>
      {authState && authState.id === UserId ? (
      <div className=" pl-44 mr-4 justify-center py-12 px-4 md:pl-80">
        <Formik
          enableReinitialize
          initialValues={userData}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required("Required")
              .min(3, "Too Short")
              .max(20, "Too Long")
              .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
            lastName: Yup.string()
              .required("Required")
              .min(3, "Too Short")
              .max(20, "Too Long")
              .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
            email: Yup.string().required("Required"),
            phone: Yup.string()
              .required("Required")
              .min(10, "Too Short")
              .max(10, "Too Long")
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Phone number is not valid"
              ),
          })}
          //Form Data submit Fun..
          onSubmit={(values) => {
            values.id = authState.id;
            axios({
              method: "POST",
              url: "http://localhost:5000/admin/updateadmin",
              data: {
                values,
              },
              headers: {
                accessToken: localStorage.getItem("authtoken"),
              },
            })
              .then((res) => {
                //API call successfull
                if (res.data.error) {
                  window.alert(res.data.error);
                } else {
                  setAuthState({
                    email: values.email,
                    name: values.firstName,
                    id: values.id,
                    status: true,
                  });
                  alert("Profile Update Success");
                  navigate("/");
                }
              })
              .catch((error) => {
                // API call failed
                window.alert(error);
              });
          }}
        >
          <Form>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                {/* Title */}
                <div>
                  <h1 className="mt-6 text-center text-xl font-extrabold text-gray-800 md:text-3xl uppercase">
                    Update Admin Details
                  </h1>
                </div>
                {/* Form section */}
                <div className="rounded-md shadow-sm ">
                  <div>
                    <label htmlFor="firstName" className="text-gray-700">
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your First Name"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="span"
                      name="firstName"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="lastName" className="text-gray-700">
                      Last Name
                    </label>
                    <Field
                      id="lastName"
                      name="lastName"
                      type="lastName"
                      autoComplete="off"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your Last Name"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="span"
                      name="lastName"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="email" className="text-gray-700">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="span"
                      name="email"
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="phone" className="text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="phone"
                      autoComplete="off"
                      required
                      className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage
                      className="text-red-500"
                      component="span"
                      name="phone"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="group uppercase relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
       ) : (<><PageNotFound/></>)}
    </>
  );
};

export default EditUserProfile;

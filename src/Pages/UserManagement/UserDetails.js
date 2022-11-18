import { React, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

//Axios
import axios from "axios";

//Context import
import { authContext } from "../../Components/Hooks/AuthContext";
import { menuContext } from "../../Components/Hooks/MenuContext";

//Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  //HamBurger Import Using useContext
  const { hamBurger } = useContext(menuContext);

  //Admin Id Store Using useParams & useNavigate
  const { id } = useParams();
  const navigate = useNavigate();

  //Auth Details
  const { authState } = useContext(authContext);

  //Get Admin Details By Id
  const [admin, setAdmin] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/getAdmin/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  }, [id]);

  //Super Admin Check Fun...
  const checkSuperAdmin = () => {
    axios
      .get(`http://localhost:5000/admin/checkSuperAdmin/${authState.id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          confirmAdmin();
        }
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  };

  //Admin Confirm
  const confirmAdmin = () => {
    axios
      .get(`http://localhost:5000/admin/confirmAdminById/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("Confirmed Success");
        }
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  };

  // Admin Delete
  const deleteAdmin = () => {
    axios
      .get(`http://localhost:5000/admin/deleteAdmin/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.warning("Admin Deleted");
        }
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  };

  //Admin Block
  const blockAdmin = () => {
    axios
      .get(`http://localhost:5000/admin/blockAdmin/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.warning("Admin Blocked");
        }
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  };

  //Suspend Admin
  const suspendAdmin = () => {
    axios
      .get(`http://localhost:5000/admin/suspendAdmin/${id}`, {
        headers: {
          accessToken: localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.warning("Admin Suspended");
        }
      })
      .catch((error) => {
        // API call failed
        window.alert(error);
      });
  };

  return (
    <div
      className={
        hamBurger
          ? " top-[75px] right-[5px] left-[100px] transition-all"
          : " top-[75px] right-[5px] left-[300px] transition-all"
      }
    >
      <div>
        <div className="my-12 flex justify-center text-red-500 items-center text-4xl mb-5 font-extrabold uppercase tracking-widest">
          <button
            className="mr-12 text-3xl text-green-700"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          Admin Details
        </div>

        {/* Admin Card */}
        <div className=" flex justify-center items-center shadow-xl rounded-2xl">
          <div className="block p-6 bg-white sm:p-8 rounded-xl">
            <div className="mt-16 sm:pr-8">
              <h5 className="text-xl font-bold text-gray-900">
                {" "}
                FIRST NAME: {admin && admin.data.firstName}
              </h5>
              <h5 className="text-xl font-bold text-gray-900 my-3">
                {" "}
                LAST NAME: {admin && admin.data.lastName}
              </h5>
              <h5 className="text-xl font-bold text-gray-900">
                {" "}
                PHONE: {admin && admin.data.phone}
              </h5>
            </div>
            <div className="mt-2 sm:pr-8">
              <h5 className="text-xl font-bold text-gray-900">
                {" "}
                EMAIL: {admin && admin.data.email}
              </h5>

              <h5 className="text-2xl font-bold uppercase tracking-widest text-red-400 mt-7">
                Actions
              </h5>
            </div>

            {/* Actions Buttons */}

            <div className="flex items-center -space-x-4 hover:space-x-2 mt-4 ">
              {/* Suspend Btn */}
              <button
                onClick={() => {
                  suspendAdmin();
                }}
                title="Suspend"
                className="z-30 block w-12 h-12 text-black transition-all bg-yellow-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                type="button"
              >
                <i className="fa-solid fa-skull-crossbones"></i>
              </button>

              {/* Block Btn */}
              <button
                onClick={() => {
                  blockAdmin();
                }}
                title="Block"
                className="z-30 block w-12 h-12 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-yellow-50"
                type="button"
              >
                <i className="fa-solid fa-lock"></i>
              </button>

              {/* Delete Btn */}
              <button
                onClick={() => {
                  deleteAdmin();
                }}
                title="Delete"
                className="z-30 block w-12 h-12 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                type="button"
              >
                <i className="fa-solid fa-trash"></i>
              </button>

              {/* Confirm Btn */}
              <button
                onClick={() => {
                  checkSuperAdmin();
                }}
                title="Confirm"
                className="z-30 block w-12 h-12 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                type="button"
              >
                <i className="fa-solid fa-user-check"></i>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default UserDetails;

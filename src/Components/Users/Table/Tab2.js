import React, { useEffect, useState } from "react";

//Axios Import
import axios from "axios";

//Admin Table Import
import Table from "./Table";

const Tab2 = () => {
  //Get All users Data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/users/all", {
          headers: {
            accessToken: localStorage.getItem("authtoken"),
          },
        })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          // API call failed
          window.alert(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {users && users ? <Table data={users} rowsPerPage={8} /> : "loading.."}
    </div>
  );
};

export default Tab2;

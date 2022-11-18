import { React, useContext } from "react";

//HamBurger import Using useContext
import { menuContext } from "../../Components/Hooks/MenuContext";

//Admin Details Table Import
import Tab2 from "../../Components/Users/Table/Tab2";

const UserManagement = () => {
  //HamBurger import Using useContext
  const { hamBurger } = useContext(menuContext);

  return (
    <>
      <div
        className={
          hamBurger
            ? "fixed top-[75px] right-[5px] left-[100px] transition-all"
            : "fixed top-[75px] right-[5px] left-[300px] transition-all"
        }
      >
        <div>
          <Tab2 />
        </div>
      </div>
    </>
  );
};

export default UserManagement;

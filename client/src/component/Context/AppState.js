import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import appContext from "./CreateContext";

const AppState = (props) => {
  const [loginShow, setloginShow] = useState(false);
  const [registerShow, setregisterShow] = useState(false);
  const [isEditShow, setisEditShow] = useState(false);
  const [allUsersData, setallUsersData] = useState([]);
  const [loggedInUserData, setloggedInUserData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isPasswordShow, setisPasswordShow] = useState(false);
  const [confirmShow, setconfirmShow] = useState(false);
  const setUsersInfo = async()=> {
    try {
      const { data } = await axios.get("http://localhost:5000/user/data", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setloggedInUserData(data);
    } catch (error) {
      console.log("data");
      setloggedInUserData([]);
    }
    setisLoading(false);
    console.log(loggedInUserData);
  }
  const toggleDeletePopup = () => {
    setconfirmShow(!confirmShow);
  };
  return (
    <appContext.Provider
      value={{
        loginShow,
        setloginShow,
        registerShow,
        setregisterShow,
        isEditShow,
        setisEditShow,
        setUsersInfo,
        isLoading,
        setisLoading,
        loggedInUserData,
        confirmShow,
        toggleDeletePopup,
        allUsersData,
        setallUsersData,
        isPasswordShow,
        setisPasswordShow
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default AppState;

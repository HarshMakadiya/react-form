import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./component/layout/Layout";
import LoggedInUser from "./component/Modal/LoggedInUser";
import Admin from "./component/Admin/Admin";
import { useContext, useEffect } from "react";
import appContext from "./component/Context/CreateContext";
import Loader from "./component/UI/Loader";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const { setUsersInfo, isLoading, loggedInUserData } = useContext(appContext);
  useEffect(() => {
    setTimeout(()=>{
      setUsersInfo();
    },1000)
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />} />
            {loggedInUserData && loggedInUserData.mail === "admin@gmail.com" && (
              <Route path="/admin" element={<Admin />} />
             )}  
            {loggedInUserData && loggedInUserData.length !== 0 && (
              <Route path="/loggedInUser" element={<LoggedInUser />} />
             )} 
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;

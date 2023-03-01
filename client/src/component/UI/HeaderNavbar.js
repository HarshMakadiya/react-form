import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import appContext from "../Context/CreateContext";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";
import { toast } from "react-toastify";
import axios from "axios";
import PasswordModal from "../Modal/PasswordModal";
const HeaderNavbar = () => {
  const navigate = useNavigate();
  const {
    setloginShow,
    loginShow,
    registerShow,
    setregisterShow,
    setUsersInfo,
    loggedInUserData,
    setallUsersData,
    isPasswordShow,
    setisPasswordShow
  } = useContext(appContext);
  const removeLoggedIn = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/logout",
        loggedInUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success("Successfully Logged out");
      setUsersInfo();
      setallUsersData(null);
      navigate("/");
    } catch (err) {
      toast.error(`${err.response.data.error}`);
    }
  };
  const passwordChange = async () => {
    setisPasswordShow(true);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Student Registration form</Navbar.Brand>
          <Nav className="ms-auto">
            {loggedInUserData.length!==0 && (
              <Link
                style={{ textDecoration: "none" }}
                className="nav-link"
                to="/loggedInUser"
              >
                Profile
              </Link>
            )}
          </Nav>
          <Nav>
            {loggedInUserData.length===0 ? (
              <>
                <Nav.Link
                  href="#register"
                  onClick={() => {
                    setregisterShow(true);
                  }}
                >
                  Register
                </Nav.Link>
                <Nav.Link
                  href="#login"
                  onClick={() => {
                    setloginShow(true);
                  }}
                >
                  Login
                </Nav.Link>
                {}
              </>
            ) : (
              <>
                <Nav.Link onClick={removeLoggedIn}>Logout</Nav.Link>
                <Nav.Link onClick={passwordChange}>Change Password</Nav.Link>
              </>
            )}
            {loggedInUserData.length!==0 &&
              loggedInUserData.mail === "admin@gmail.com" && (
                <Link
                  style={{ textDecoration: "none" }}
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </Link>
              )}
          </Nav>
        </Container>
      </Navbar>
      {registerShow && <RegisterModal />}
      {loginShow && <LoginModal />}
      {isPasswordShow && <PasswordModal />}
    </>
  );
};

export default HeaderNavbar;

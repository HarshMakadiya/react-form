import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../Context/CreateContext";
import Footer from "../UI/Footer";
import HeaderNavbar from "../UI/HeaderNavbar";
import EditModal from "./EditModal";

const LoggedInUser = (props) => {
  const [userData, setuserData] = useState({});
  const {
    setisEditShow,
    isEditShow
  } = useContext(appContext);
  const editUser = ()=>{
    setisEditShow(true);
  }
  const getData = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/user/data", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setuserData(data);
    } catch (err) {
      toast.error(`${err.response.data.error}`);
      const navigate = Navigate();
      navigate("/");
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  return (
    (Object.keys(userData).length > 0) ?
    (<>
      <HeaderNavbar />
      <Card className="m-auto mt-3" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ height: 150, width: 100, margin: "auto" }}
          src={(userData.image)? `/Images/${(userData.image) }`:"https://png.pngitem.com/pimgs/s/49-497522_transparent-guy-thinking-png-random-guy-cartoon-png.png"}
        />
        <Card.Body>
          <Card.Title>
            {userData.firstname.charAt(0).toUpperCase() +
              userData.firstname.slice(1)}{" "}
            {userData.lastname.charAt(0).toUpperCase() +
              userData.lastname.slice(1)}
          </Card.Title>
          <Card.Text>
            <b>Address1</b> :- {userData.address1}
            <br />
            <b>Address2</b> :- {userData.address2}
            <br />
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <b>Email</b> :- {userData.mail}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Phoneno</b> :- {userData.phoneno}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Pincode</b> :- {userData.pincode}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="primary" onClick={editUser}>Edit</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Footer />
      {isEditShow && <EditModal index={userData.id} getData={getData}/>}
    </>):(<></>)
  );
};

export default LoggedInUser;

import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import appContext from "../Context/CreateContext";
import { toast } from "react-toastify";
import axios from "axios";

const BootstrapModal = () => {
  const { setUsersInfo } = useContext(appContext);
  function isValidEmail(email) {
    const re = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (re.test(email)) {
      return true;
    }
  }
  function passwordValidate(p) {
    const re = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
    );
    if (re.test(p)) {
      return true;
    }
  }
  const { registerShow, setregisterShow } = useContext(appContext);
  const [imageFile, setimageFile] = useState("");
  const [state, setstate] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    address1: "",
    address2: "",
    pincode: "",
    password: "",
    confirmpassword: "",
  });
  const handlerChange = (event) => {
    const value = event.target.value;
    setstate({
      ...state,
      [event.target.name]: value,
    });
  };
  const imageHandlerChange = (event)=>{
    const value = event.target.files[0];
    setimageFile(value);
  }
  const onSubmitHandler = async (event) => {
    if (state.firstname === "") {
      event.preventDefault();
      toast.error("Please enter first name");
    } else if (state.lastname === "") {
      event.preventDefault();
      toast.error("Please enter last name");
    } else if (state.address1 === "") {
      event.preventDefault();
      toast.error("Please enter address1");
    } else if (state.password === "") {
      event.preventDefault();
      toast.error("Please enter password");
    } else if (state.confirmpassword === "") {
      event.preventDefault();
      toast.error("Please enter confirm password");
    } else if (state.phoneno.length < 10) {
      event.preventDefault();
      toast.error("PhoneNumber must be of length 10");
    } else if (state.pincode.length < 6) {
      event.preventDefault();
      toast.error("Pincode must be of length 6");
    } else if (!isValidEmail(state.email)) {
      event.preventDefault();
      toast.error("Enter valid email");
    } else if (!passwordValidate(state.password)) {
      event.preventDefault();
      toast.error(
        "Enter password with min length 6, containing A,a,# or @, 0-9"
      );
    } else if (state.password !== state.confirmpassword) {
      event.preventDefault();
      toast.error("Password and Confirm Password does not match");
    } else {
      let dataa = {};
      dataa["firstname"] = state.firstname;
      dataa["lastname"] = state.lastname;
      dataa["address1"] = state.address1;
      dataa["address2"] = state.address2;
      dataa["phoneno"] = state.phoneno;
      dataa["mail"] = state.email.toLowerCase();
      dataa["pincode"] = state.pincode;
      dataa["password"] = state.password;
      dataa["confirmpassword"] = state.confirmpassword;
      dataa["image"]=imageFile;
      try {
        const { data } = await axios.post(
          "http://localhost:5000/user/register",
          dataa,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true
          }
        );
        setregisterShow(false);
        toast.success(`${data.firstname} has been registered`);
        setUsersInfo();
      } catch (err) {
        toast.error(`${err.response.data.error}`);
        console.log(err);
      }
    }
  };
  function validatePhone(maxLength) {
    if (state.phoneno.length > maxLength) {
      state.phoneno = state.phoneno.slice(0, maxLength);
    }
  }
  function validatePincode(maxLength) {
    if (state.pincode.length > maxLength) {
      state.pincode = state.pincode.slice(0, maxLength);
    }
  }
  if (registerShow === false) {
    state.phoneno = "";
    state.pincode = "";
  }
  return (
    <>
      <Modal
        show={registerShow}
        onHide={() => {
          setregisterShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Firstname"
                      onChange={handlerChange}
                      name="firstname"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Lastname"
                      onChange={handlerChange}
                      name="lastname"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={handlerChange}
                      name="email"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      value={state.phoneno}
                      placeholder="Enter phonenumber"
                      onInput={validatePhone(10)}
                      onChange={handlerChange}
                      name="phoneno"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address1"
                  onChange={handlerChange}
                  name="address1"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address2"
                  onChange={handlerChange}
                  name="address2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  value={state.pincode}
                  placeholder="Enter Pincode"
                  onChange={handlerChange}
                  onInput={validatePincode(6)}
                  name="pincode"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Upload image"
                  onChange={imageHandlerChange}
                  name="image"
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={handlerChange}
                      name="password"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=" Confirm Password"
                      onChange={handlerChange}
                      name="confirmpassword"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmitHandler}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BootstrapModal;

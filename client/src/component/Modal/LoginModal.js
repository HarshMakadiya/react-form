import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import appContext from "../Context/CreateContext";

const LoginModal = () => {
  const { loginShow, setloginShow, setUsersInfo,loggedInUserData } =
    useContext(appContext);
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
  const [inputstate, setinputstate] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    const val = event.target.value;
    setinputstate({
      ...inputstate,
      [event.target.name]: val,
    });
  };
  const onSubmitHandler = async (event) => {
    const dataa = {};
    dataa["mail"] = inputstate.email.toLowerCase();
    dataa["password"] = inputstate.password;
    if (!isValidEmail(dataa.mail)) {
      event.preventDefault();
      toast.error("Enter valid email");
    } else if (!passwordValidate(dataa.password)) {
      event.preventDefault();
      toast.error(
        "Enter password with min length 6, containing A,a,# or @, 0-9"
      );
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/user/login",
          dataa,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true
          }
        );
        // console.log(data);
        await setUsersInfo();
        setloginShow(false);
        toast.success(`Welcome ${data.firstname}`);
        navigate("/loggedInUser");
        console.log(loggedInUserData);
      } catch (err) {
        toast.error(`${err.response.data.error}`);
      }
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Modal
        show={loginShow}
        onHide={() => {
          setloginShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={changeHandler}
                      name="email"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      onChange={changeHandler}
                      name="password"
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

export default LoginModal;

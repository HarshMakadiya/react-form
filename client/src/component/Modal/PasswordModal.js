import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Col, Container, Modal, Row,Form } from "react-bootstrap";
import { toast } from "react-toastify";
// import { Form } from "react-router-dom";
import appContext from "../Context/CreateContext";

const PasswordModal = () => {
  const { isPasswordShow, setisPasswordShow, loggedInUserData, setUsersInfo } = useContext(appContext);
  function passwordValidate(p) {
    const re = RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
    );
    if (re.test(p)) {
      return true;
    }
  }
  const [inputstate, setinputstate] = useState({
    password: "",
    confirmpassword: "",
  });
  const changeHandler = (event) => {
    const val = event.target.value;
    setinputstate({
      ...inputstate,
      [event.target.name]: val,
    });
  };
//   debugger;
console.log(inputstate);
  const onSubmitHandler = async (event)=>{
    if(inputstate.password === ""){
        event.preventDefault();
        toast.error(
          "Enter password"
        );
    }else if(inputstate.confirmpassword === ""){
        event.preventDefault();
        toast.error(
          "Enter confirm password"
        );
    }else if (!passwordValidate(inputstate.password)) {
        event.preventDefault();
        toast.error(
          "Enter password with min length 6, containing A,a,# or @, 0-9"
        );
      }else{
        const dataa = {};
        dataa["password"] = inputstate.password;
        dataa["confirmpassword"] = inputstate.confirmpassword;
        try {
            const { data } = await axios.put(
                `http://localhost:5000/user/editPassword/${loggedInUserData.id}`,
                dataa,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true
                }
              );
              setUsersInfo();
              setisPasswordShow(false);
              toast.success(`${data}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
      }
  }
  return (
    <>
      <Modal
        show={isPasswordShow}
        onHide={() => {
          setisPasswordShow(false);
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={changeHandler}
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
                    placeholder="Confirm Password"
                    onChange={changeHandler}
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
        <Button onClick={(e)=> onSubmitHandler(e)}>Submit</Button>
      </Modal.Footer>
      </Modal>
    </>
  );
};

export default PasswordModal;

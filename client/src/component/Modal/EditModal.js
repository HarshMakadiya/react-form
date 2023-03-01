import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import appContext from "../Context/CreateContext";
const EditModal = (props) => {
  const { getData } = props;
  let data1={};
  const { isEditShow, setisEditShow, setUsersInfo,loggedInUserData, allUsersData } =
    useContext(appContext);
  if(allUsersData.length===0){
    data1= loggedInUserData;
  }else{
    data1 = allUsersData.filter((k,i)=>{
      return k.id===parseInt(props.index);
    })[0]
  }
  const requiredObject = data1;
  const [imageFile, setimageFile] = useState(null);
  const [stateEdit, setstateEdit] = useState(requiredObject);
  const formSubmitHandler = (event) => {
    event.preventDefault();
  };
  const imageHandlerChange = (event)=>{
    const value = event.target.files[0];
    setimageFile(value);
  }
  const handlerChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "phoneno") {
      if (value.length <= 10) {
        setstateEdit({
          ...stateEdit,
          [name]: value,
        });
      }
    } else if (name === "pincode") {
      if (value.length <= 6) {
        setstateEdit({
          ...stateEdit,
          [name]: value,
        });
      }
    } else {
      setstateEdit({
        ...stateEdit,
        [name]: value,
      });
    }
  };
  const onSubmitEditForm = async (event) => {
    if (stateEdit.firstname === "") {
      toast.error("Please enter first name");
    } else if (stateEdit.lastname === "") {
      toast.error("Please enter last name");
    } else if (stateEdit.address1 === "") {
      toast.error("Please enter address1");
    } else if (stateEdit.phoneno.length < 10) {
      toast.error("PhoneNumber must be of length 10");
    } else if (stateEdit.pincode.length < 6) {
      toast.error("Pincode must be of length 6");
    } else {
      let dataa = {};
      dataa["firstname"] = stateEdit.firstname;
      dataa["lastname"] = stateEdit.lastname;
      dataa["address1"] = stateEdit.address1;
      dataa["address2"] = stateEdit.address2;
      dataa["phoneno"] = stateEdit.phoneno;
      dataa["mail"] = stateEdit.mail;
      dataa["pincode"] = stateEdit.pincode;
      dataa["image"] = imageFile;
      // console.log(imageFile.name);
      setisEditShow(false);
      try {
        const { data } = await axios.put(
          `http://localhost:5000/user/edit/${stateEdit.id}`,
          dataa,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true
          }
        );
        toast.success("Data Updated");
        setUsersInfo();
        setstateEdit(data);
        await getData();
      } catch (err) {
        toast.error(`${err.response.data.error}`)
        console.log(err);
      }
    }
  };
  return (
    <>
      <Modal
        show={isEditShow}
        onHide={() => {
          setisEditShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formSubmitHandler}>
            <Container>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Firstname"
                      onChange={handlerChange}
                      defaultValue={requiredObject?.firstname}
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
                      defaultValue={requiredObject?.lastname}
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
                      defaultValue={requiredObject?.mail}
                      disabled
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
                      value={stateEdit?.phoneno}
                      placeholder="Enter phonenumber"
                      onChange={handlerChange}
                      defaultValue={requiredObject?.phoneno}
                      name="phoneno"
                      required
                    />
                    <Form.Text className="text-muted">
                      Enter 10 digit number
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address1"
                  onChange={handlerChange}
                  defaultValue={requiredObject?.address1}
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
                  defaultValue={requiredObject?.address2}
                  name="address2"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={imageHandlerChange}
                  name="image"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  value={stateEdit?.pincode}
                  placeholder="Enter Pincode"
                  onChange={handlerChange}
                  defaultValue={requiredObject?.pincode}
                  name="pincode"
                  required
                />
              </Form.Group>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmitEditForm}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;

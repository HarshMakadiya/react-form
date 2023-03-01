import axios from "axios";
import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import appContext from "../Context/CreateContext";

const DeleteModal = (props) => {
  const mail = props;
  const { getData } = props;
  const { confirmShow, toggleDeletePopup, allUsersData, setUsersInfo } =
    useContext(appContext);
  const deleteUser = async () => {
    const emailFilter = allUsersData.filter((k, i) => {
      return k.mail === mail.mail;
    });
    try {
      const id = emailFilter[0].id;
      console.log(id);
      const { data } = await axios.delete(
        `http://localhost:5000/user/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data);
      toggleDeletePopup();
      await getData();
      setUsersInfo();
    } catch (err) {
      toast.error(`${err.response.data.error}`);
    }
  };
  return (
    <>
      <Modal show={confirmShow} onHide={toggleDeletePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDeletePopup}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;

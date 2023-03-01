import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import appContext from "../Context/CreateContext";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import Footer from "../UI/Footer";
import HeaderNavbar from "../UI/HeaderNavbar";

const Admin = () => {
  const {
    setisEditShow,
    isEditShow,
    setallUsersData,
    confirmShow,
    toggleDeletePopup,
  } = useContext(appContext);
  const [storageData, setstorageData] = useState({});
  const [editModalIndex, seteditModalIndex] = useState("");
  const [confirmModalMail, setconfirmModalMail] = useState("");
  const [total, setTotal] = useState(0);
  const [pageItems, setpageItems] = useState(0);
  const [message, setMessage] = useState('');
  
  const handlePageClick = async (event) => {
    setpageItems(event.selected);
  };
  function debounce(fn, delay){
    let timeout;
    return (...args)=>{
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        fn(...args)
      },delay)
    }
  }
  const getData = async () => {
    try {
      console.log(message);
      const { data } = await axios.get(
        `http://localhost:5000/user/alldata?page=${pageItems}&search=${message}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTotal(data.totalPages);
      setstorageData(data.studentsData);
      setallUsersData(data.studentsData);
    } catch (error) {
      console.log("Could not get data");
    }
  };
  useEffect(() => {
    getData();
  }, [pageItems, message]);
  const deleteItem = (e, mail) => {
    toggleDeletePopup();
    setconfirmModalMail(mail);
  };
  const editItem = (mail) => {
    const index = storageData.filter((key, index) => {
      return mail === key.mail;
    });
    setisEditShow(true);
    seteditModalIndex(index[0].id);
  };
  return  (
    <>
    <HeaderNavbar />
      <h1>Admin</h1>
      <div>
      <div class="form-outline">
        <input
          onChange={debounce((event)=>setMessage(event.target.value),500)}
          type="search"
          id="form1"
          className="form-control"
          placeholder="Type query"
          aria-label="Search"
        />
      </div>
      </div>
      <Table striped bordered hover size="sm" responsive="sm">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Pincode</th>
            <th>Phone Number</th>
            <th>Mail</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {Object.keys(storageData).length > 0 ?
        <tbody>
          {storageData?.map((key, index) => {
            return (
              <tr>
                <td>{key.firstname}</td>
                <td>{key.lastname}</td>
                <td>{key.address1}</td>
                <td>{key.address2}</td>
                <td>{key.pincode}</td>
                <td>{key.phoneno}</td>
                <td>{key.mail}</td>
                <td>
                  {
                    <Button variant="info" onClick={() => editItem(key.mail)}>
                      Edit
                    </Button>
                  }
                </td>
                <td>
                  {key.mail === "admin@gmail.com" ? (
                    <Button
                      onClick={(e) => {
                        deleteItem(e, key.mail);
                      }}
                      variant="danger"
                      disabled
                    >
                      Admin
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        deleteItem(e, key.mail);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody> : []}
      </Table>
      {confirmShow && <DeleteModal mail={confirmModalMail} getData={getData} />}
      {isEditShow && <EditModal index={editModalIndex} getData={getData} />}
      <ReactPaginate
        breakLabel="..."
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={total}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        containerClassName={"pagination justify-content-center"}
      />
      <Footer />
    </>
  )
};

export default Admin;

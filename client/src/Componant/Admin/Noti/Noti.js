import React, { useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Noti.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Noti = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("Admin");
    fetch("http://localhost:3000/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
        } else {
          Swal.fire({
            icon: "error",
            title: "กรุณาลงชื่อก่อนเข้าใช้งาน",
            text: "",
            showConfirmButton: false,
            timer: 3500,
          });
          localStorage.removeItem("Admin");
          navigate("/Login");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="container">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-6"
        >
          <Tab
            eventKey="home"
            title="การแจ้งเตือนทั้งหมด"
            className="notibackground"
          >
            <br />
            <p>การแจ้งเตือนทั้งหมด</p>
          </Tab>
          <Tab
            eventKey="profile"
            title="การแจ้งเตือนการลา"
            className="notibackground"
          >
            <br />
            <p>การแจ้งเตือนการลา</p>
          </Tab>
          <Tab
            eventKey="contact"
            title="การแจ้งเตือนทีม"
            className="notibackground"
          >
            <br />
            <p>การแจ้งเตือนทีม</p>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default Noti;

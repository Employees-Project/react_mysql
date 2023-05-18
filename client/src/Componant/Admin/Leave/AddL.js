import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

const AddL = () => {
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

  const [subject, setSubject] = useState("");
  const [limit_m, setLimit_m] = useState("");
  const [limit_y, setLimit_y] = useState("");

  const addLeave = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      l_subject: subject,
      l_limit_m: limit_m,
      l_limit_y: limit_y,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (subject === "" || limit_m === "" || limit_y === "") {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มข้อมูลได้",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else if (subject !== "" || limit_m !== "" || limit_y !== "") {
      if (limit_m > "31" || limit_y > "366") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "ไม่สามารถเพิ่มข้อมูลได้",
          text: "ข้อมูลไม่ตรงเงื่อนไข",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          timer: 2500,
        });
        fetch("http://localhost:3000/add/leave", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(
              "🚀 ~ file: AddL.js:59 ~ .then ~ result:",
              result.status
            );
            if (result.status === "error") {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ไม่สามารถเพิ่มหัวข้อการลานี้ได้",
                text: "มีข้อหัวการลานี้แล้ว",
                showConfirmButton: true
              });
            } else if (result.status === "ok") {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "เพิ่มข้อมูลสำเร็จ",
                timer: 2500,
              });
              navigate("/admin/leave");
            }
          });
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3">
          <div>
            <h2>เพิ่มหัวข้อการลา</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="l_subject">
              หัวข้อการลา
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              required
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="l_limit_m">
              เกณฑ์การลารายเดือน
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter name"
              min="1"
              max="31"
              required
              onChange={(event) => {
                setLimit_m(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="l_limit_y">
              เกณฑ์การลารายปี
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter name"
              min="1"
              max="366"
              required
              onChange={(event) => {
                setLimit_y(event.target.value);
              }}
            />
          </div>
          <button onClick={addLeave} class="btn btn-success">
            เพิ่มข้อมูลการลา
          </button>
          <Link to="/admin/leave" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddL;

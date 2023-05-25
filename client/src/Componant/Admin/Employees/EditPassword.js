import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      password: newPassword,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (newPassword !== confirmPassword) {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถแก้ไขรหัสผ่านได้",
        text: "รหัสผ่านไม่ตรงกัน",
      });
    } else if (newPassword === confirmPassword) {
      fetch(
        `https://project-test-1.herokuapp.com/update/password/${id}`,
        requestOptions
      ).then(
        Swal.fire({
          position: "center",
          icon: "success",
          title: "แก้ไขรหัสผ่านสำเร็จ",
          showConfirmButton: false,
          timer: 2500,
        })
      );
      navigate("/admin/employee");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Admin");
    fetch("https://project-test-1.herokuapp.com/authen", {
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
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>แก้ไขรหัสผ่าน</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="new-password">
              รหัสผ่านใหม่:
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="new-password">
              ยืนยันรหัสผ่าน:
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          <button onClick={updatePassword} className="btn btn-success">
            แก้ไขรหัสผ่าน
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditPassword;

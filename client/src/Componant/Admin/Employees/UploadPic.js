import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UploadPic = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [pic, setPic] = useState("");

  const handleFile = (e) => {
    setPic(e.target.files[0]);
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

  const handleUpload = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", pic);
    axios
      .put(`https://project-test-1.herokuapp.com/upload/${id}`, formdata)
      .then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่มรูปภาพสำเร็จ",
            timer: 2500,
          });
          navigate("/admin/employee");
          console.log("Success");
        } else {
          console.log("Failed");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white" encType="multipart/form-data">
          <div>
            <h2>เพิ่มรูปพนักงาน</h2>
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="username">
              รูปภาพ:
            </label>
            <input
              type="file"
              className="form-control"
              required
              onChange={handleFile}
            />
          </div>
          <button onClick={handleUpload} className="btn btn-success">
            อัปโหลดรูปภาพ
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default UploadPic;

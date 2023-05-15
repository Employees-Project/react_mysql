import React, { useState } from "react";
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

  const handleUpload = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", pic);
    axios
      .put(`http://localhost:3000/upload/${id}`, formdata)
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
      <div className="form-container1">
        <form className="form-signin row g-3" enctype="multipart/form-data">
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
          <button onClick={handleUpload} class="btn btn-success">
            Uploadl Picture
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            Back
          </Link>
        </form>
      </div>
    </>
  );
};

export default UploadPic;

import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import './Admin.css'

const CerInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [pic, setPic] = useState("");

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
    getUsers();
  }, []);

  function getUsers() {
    fetch(`https://project-test-1.herokuapp.com/users/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        // setData(resp);
        setEmployeeName(resp[0].employeeName);
        // setPhoneNo(resp[0].phoneNo);
        // setJobPosition(resp[0].jobPosition);
        // setPosition(resp[0].position);
        // setEmail(resp[0].email);
        // setAddress(resp[0].address);
        // setDisdrict(resp[0].disdrict);
        // setAmphur(resp[0].amphur);
        // setProvince(resp[0].province);
        // setZipCode(resp[0].zipCode);
        setPic(resp[0].pic);
        // setGender(resp[0].gender);
        // setRawIdentityNo(resp[0].identityNo);
        // setRawBirthday(resp[0].birthday);
      });
    });
  }

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>ข้อมูลใบประกาศนียบัตรของ {employeeName}</h2>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3><br/>
              {pic ? (
              <img
                src={`https://project-test-1.herokuapp.com/image/${pic}`}
                className="rounded mx-auto d-block krob"
                width="550"
                height="250"
              />
            ) : (
              <img
                src="https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png"
                className="rounded mx-auto d-block krob"
                width="550"
                height="250"
              />
            )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3><br/>
              {pic ? (
              <img
                src={`https://project-test-1.herokuapp.com/image/${pic}`}
                className="rounded mx-auto d-block krob"
                width="550"
                height="250"
              />
            ) : (
              <img
                src="https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png"
                className="rounded mx-auto d-block krob"
                width="550"
                height="250"
              />
            )}
            </div><br/>
          </div>
          <div className="col-md-6 d-grid">
          <Link to={"/admin/employee/info/" + id} className="btn btn-primary">
            ย้อนกลับหน้าข้อมูลพนักงาน
          </Link>
          </div>
          <div className="col-md-6 d-grid">
          <Link to="/admin/" className="btn btn-primary">
            ย้อนกลับหน้าหลัก
          </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CerInfo;

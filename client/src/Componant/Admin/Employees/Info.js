import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disdrict, setDisdrict] = useState("");
  const [amphur, setAmphur] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");

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
    getUsers();
  }, []);

  function getUsers() {
    fetch(`http://localhost:3000/users/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        // setData(resp);
        setEmployeeName(resp[0].employeeName);
        setPhoneNo(resp[0].phoneNo);
        setJobPosition(resp[0].jobPosition);
        setPosition(resp[0].position);
        setEmail(resp[0].email);
        setAddress(resp[0].address);
        setDisdrict(resp[0].disdrict);
        setAmphur(resp[0].amphur);
        setProvince(resp[0].province);
        setZipCode(resp[0].zipCode);
      });
    });
  }
  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3">
          <div>
            <h2>ข้อมูลพนักงาน</h2>
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="employeeName">
              ชื่อ - นามสกุล:
            </label>
            <input
              type="text"
              className="form-control"
              disabled
              value={employeeName}
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="phoneNo">
              เบอร์โทร:
            </label>
            <input
              type="text"
              className="form-control"
              value={phoneNo}
              disabled
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <label className="form-label">ตำแหน่งงาน:</label>
            <input
              htmlFor="jobPosition"
              className="form-control"
              value={jobPosition}
              disabled
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <label className="form-label">ตำแหน่ง:</label>
            <input
              htmlFor="position"
              className="form-control"
              value={position}
              disabled
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="email">
              อีเมล:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="address">
              ที่อยู่:
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="address">
              จังหวัด:
            </label>
            <input
              type="text"
              className="form-control"
              value={province}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="address">
              อำเภอ/เขต:
            </label>
            <input
              type="text"
              className="form-control"
              value={amphur}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="address">
              ตำบล/แขวง:
            </label>
            <input
              type="text"
              className="form-control"
              value={disdrict}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">รหัสไปรษณีย์:</label>
            <input
              type="text"
              className="form-control"
              value={zipCode}
              disabled
              required
            />
          </div>
          <Link to="/admin/employee" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default Info;

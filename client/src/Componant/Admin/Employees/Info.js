import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";
import "./Info.css";

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
  const [pic, setPic] = useState("");
  const [gender, setGender] = useState("");
  const [rawIdentityNo, setRawIdentityNo] = useState("");
  const [rawBirthday, setRawBirthday] = useState("");

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
        setPhoneNo(resp[0].phoneNo);
        setJobPosition(resp[0].jobPosition);
        setPosition(resp[0].position);
        setEmail(resp[0].email);
        setAddress(resp[0].address);
        setDisdrict(resp[0].disdrict);
        setAmphur(resp[0].amphur);
        setProvince(resp[0].province);
        setZipCode(resp[0].zipCode);
        setPic(resp[0].pic);
        setGender(resp[0].gender);
        setRawIdentityNo(resp[0].identityNo);
        setRawBirthday(resp[0].birthday);
      });
    });
  }

  var date = new Date(rawBirthday);

  const birthday = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const identityNo = rawIdentityNo.replace(
    /(\d{1})(\d{4})(\d{4})(\d{1})(\d{3})/,
    "$1-$2-xxxx-x-$5"
  );

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>ข้อมูลพนักงาน</h2>
            <br />
          </div>
          <div>
            {pic ? (
              <img
                src={`https://project-test-1.herokuapp.com/image/${pic}`}
                className="rounded mx-auto d-block"
                width="250"
                height="250"
              />
            ) : (
              <img
                src="https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png"
                className="rounded mx-auto d-block"
                width="250"
                height="250"
              />
            )}
            <br />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="employeeName">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              className="form-control"
              disabled
              value={employeeName}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="phoneNo">
              รหัสบัตรประชาชน
            </label>
            <input
              type="text"
              className="form-control"
              value={identityNo}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="phoneNo">
              เบอร์โทร
            </label>
            <input
              type="text"
              className="form-control"
              value={phoneNo}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="phoneNo">
              เพศ
            </label>
            <input
              type="text"
              className="form-control"
              value={gender ? "ชาย" : "หญิง"}
              disabled
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="phoneNo">
              วันเกิด
            </label>
            <input
              type="text"
              className="form-control"
              value={birthday}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">ตำแหน่งงาน:</label>
            <input
              htmlFor="jobPosition"
              className="form-control"
              value={jobPosition}
              disabled
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">ตำแหน่ง:</label>
            <input
              htmlFor="position"
              className="form-control"
              value={position}
              disabled
            />
          </div>
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
            <br />
          </div>
          <hr />
          <br />
          <div>
            ข้อมูลใบประกาศนียบัตร
            <br />
          </div>
          <div className="card w">
            <img
              className="card-img-top"
              src={`https://project-test-1.herokuapp.com/image/${pic}`}
              width="400"
              height="170"
            />
            <div className="card-body">
              <p className="card-text f-size">ข้อแตกต่างระหว่างใบประกาศนียบัตร อนุปริญญา และปริญญา เลือกเรียนแบบไหนให้เหมาะเอาใบไปใช้จริง</p>
            </div>
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

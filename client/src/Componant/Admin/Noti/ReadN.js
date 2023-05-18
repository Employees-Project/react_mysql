import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ReadN = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [l_subject, setL_subject] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [l_detail, setL_detail] = useState("");
  const [r_subject, setR_subject] = useState("");


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
    getHistory();
  }, []);

  function getHistory() {
    fetch(`http://localhost:3000/history/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        // setData(resp);
        setL_subject(resp[0].l_subject);
        setEmployeeName(resp[0].employeeName);
        setL_detail(resp[0].l_detail);
        setR_subject(resp[0].r_subject);
      });
    });
  }
  return (
    <>
      <AdminNavbar />
      <div className="form-container">
        <form className="form-signin row g-3">
          <div>
            <h2>หัวข้อ: {l_subject ? `${l_subject}` : `${r_subject}`}</h2>
          </div>
          <div className="col-md-12">
            <p>ชื่อ: {employeeName}</p>
          </div>
          <div className="col-md-12">
            <p>{l_detail ? "รายละเอียด:" : null}</p>
            <p>{l_detail}</p>
          </div>
          <Link to="/admin/noti" className="btn btn-success col-md-5 justify-content-between">
            อนุมัติ
          </Link>
          <div className="col-md-2"></div>
          <Link to="/admin/noti" className="btn btn-danger col-md-5 justify-content-between">
            ไม่อนุมัติ
          </Link>
          <Link to="/admin/noti" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default ReadN;

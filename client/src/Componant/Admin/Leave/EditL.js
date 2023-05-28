import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditL = () => {
  const navigate = useNavigate();
  

  const { id } = useParams();
  const [l_subject, setSubject] = useState("");
  const [l_limit_m, setLimit_m] = useState("");
  const [l_limit_y, setLimit_y] = useState("");

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
    getLeaves();
  }, []);

  function getLeaves() {
    fetch(`https://project-test-1.herokuapp.com/leave/admin/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setSubject(resp[0].l_subject);
        setLimit_m(resp[0].l_limit_m);
        setLimit_y(resp[0].l_limit_y);
      });
    });
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    l_subject: l_subject,
    l_limit_m: l_limit_m,
    l_limit_y: l_limit_y,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const updateLeave = (event) => {
    event.preventDefault();
    if (l_subject === "" || l_limit_m === "" || l_limit_y === "") {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มข้อมูลได้",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else if (l_subject !== "" || l_limit_m !== "" || l_limit_y !== "") {
      if (l_limit_m > 31 || l_limit_y > 366) {
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
        fetch(`https://project-test-1.herokuapp.com/update/leave/admin/${id}`, requestOptions).then(
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่มข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 2500,
          })
        );
        navigate("/admin/leave");
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>แก้ไขข้อการลา</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="subject">
              หัวข้อการลา
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={l_subject}
              required
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="limit_m">
              เกณฑ์การลารายเดือน
            </label>
            <input
              type="number"
              min="1"
              max="31"
              className="form-control"
              placeholder="Enter name"
              value={l_limit_m}
              required
              onChange={(event) => {
                setLimit_m(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="limit_y">
              เกณฑ์การลารายปี
            </label>
            <input
              type="number"
              min="1"
              max="366"
              className="form-control"
              placeholder="Enter name"
              value={l_limit_y}
              required
              onChange={(event) => {
                setLimit_y(event.target.value);
              }}
            />
          </div>
          <button onClick={updateLeave} className="btn btn-success">
            เพิ่มข้อมูลพนักงาน
          </button>
          <Link to="/admin/leave" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditL;

import React, { useEffect, useState } from "react";
import AdminNavbar from "./Admin/AdminNavbar/AdminNavbar";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const headers = [
  { label: "ID", key: "employeeId" },
  { label: "ชื่อ-นามสกุล", key: "employeeName" },
  { label: "เพศ", key: "gender" },
  { label: "วันเกิด", key: "birthday" },
  { label: "เบอร์โทร", key: "phoneNo" },
  { label: "Email", key: "email" },
  { label: "ตำแหน่งงาน", key: "jobPosition" },
  { label: "ตำแหน่ง", key: "position" },
  { label: "ที่อยู่", key: "address" },
  { label: "จังหวัด", key: "province" },
  { label: "อำเภอ", key: "amphur" },
  { label: "ตำบล", key: "disdrict" },
  { label: "รหัสไปรษณีย์", key: "zipCode" },
  { label: "สถานะบัญชี", key: "active" },
];

const CSV = () => {
  const navigate = useNavigate();

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

  const [employeeList, setEmployeeList] = useState([]);

  async function getUsers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/users", requestOptions)
      .then((response) => response.json())
      .then((result) => setEmployeeList(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <AdminNavbar />
      <CSVLink
        // data={employeeList.map((val) => {
        //   return {
        //     employeeId: val.employeeId,
        //     employeeName: val.employeeName,
        //     phoneNo: val.phoneNo,
        //     email: val.email,
        //     jobPosition: val.jobPosition,
        //     position: val.position,
        //     address: val.address,
        //     province: val.province,
        //     amphur: val.amphur,
        //     disdrict: val.disdrict,
        //     zipCode: val.zipCode,
        //     active: val.active
        //   };
        // })}
        data={employeeList}
        headers={headers}
        filename="test"
        className="btn btn-danger"
      >
        Download me
      </CSVLink>
    </>
  );
};

export default CSV;

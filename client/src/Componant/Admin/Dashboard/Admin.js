import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem('Admin')
      fetch('http://localhost:3000/authen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
        } else {
          Swal.fire({
            icon: 'error',
            title: 'กรุณาลงชื่อก่อนเข้าใช้งาน',
            text: '',
            showConfirmButton: false,
            timer: 3500
          })
          localStorage.removeItem('Admin');
          navigate("/Login");
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    }, [])
  return (
    <>
      <AdminNavbar />
      <h3>Test Admin</h3>
    </>
  );
};

export default Admin;

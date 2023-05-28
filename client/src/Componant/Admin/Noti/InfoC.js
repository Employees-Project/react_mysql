import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InfoC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [certificatePic, setCertificatePic] = useState("");
  const [approve, setApprove] = useState("");

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
    getHistory();
  }, []);

  const approve1 = (id) => {

    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    
    fetch(`https://project-test-1.herokuapp.com/history/update/cer1/${id}`, requestOptions)
      .then(navigate("/admin/noti"))
      .catch(error => console.log('error', error));
  };

  const approve0 = (id) => {

    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    
    fetch(`https://project-test-1.herokuapp.com/history/update/cer0/${id}`, requestOptions)
      .then(navigate("/admin/noti"))
      .catch(error => console.log('error', error));
  };

  function getHistory() {
    fetch(`https://project-test-1.herokuapp.com/history/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setHistory(resp);
        setEmployeeName(resp[0].employeeName);
        setApprove(resp[0].approve);
        setCertificateName(resp[0].certificateName);
        setCertificatePic(resp[0].certificatePic);
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
            <h2>หัวข้อ: {certificateName ? `${certificateName}` : null }</h2>
          </div>
          <div className="col-md-12">
            <p>ชื่อ: {employeeName}</p>
          </div>
          <div className="col-md-12">
            <p>{certificateName ? "รายละเอียด:" : null}</p>
            <p>{certificatePic ? `${certificatePic}` : "(รอใส่รูปภาพ)"}</p>
          </div>
          {history.map((data) => {
            if (data.r_subject === null && data.approve === null) {
              return (
                <div className="row g-3">
                  <Link
                    onClick={() =>
                      Swal.fire({
                        title: "คุณต้องการอนุมัติใช่หรือไม่?",
                        // text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ใช่! ฉันต้องอนุมัติ",
                        cancelButtonText: "ยกเลิก",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          approve1(data.historyId);
                          Swal.fire(
                            "สำเร็จ!",
                            "คุณได้อนุมัติแล้ว",
                            "success"
                          );
                        }
                      })
                    }
                    className="btn btn-success col-md-5 justify-content-between"
                  >
                    อนุมัติ
                  </Link>
                  <div className="col-md-2"></div>
                  <Link
                    onClick={() =>
                      Swal.fire({
                        title: "คุณต้องการไม่อนุมัติใช่หรือไม่?",
                        // text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ใช่! ฉันไม่อนุมัติ",
                        cancelButtonText: "ยกเลิก",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          approve0(data.historyId);
                          Swal.fire(
                            "สำเร็จ!",
                            "คุณไม่ได้อนุมัติ",
                            "success"
                          );
                        }
                      })
                    }
                    className="btn btn-danger col-md-5 justify-content-between"
                  >
                    ไม่อนุมัติ
                  </Link>
                </div>
              );
            }
          })}

          <Link to="/admin/noti" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default InfoC;

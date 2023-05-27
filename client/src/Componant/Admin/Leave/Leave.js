import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Leave = () => {
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
      getLeave()
  }, []);
  const [leave, setLeave] = useState([]);
  const [deleteL, setDeleteL] = useState([]);

  const [page, setPage] = useState(1);
  const recordsPerPage = 15;
  const lastIndex = page * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = leave.slice(firstIndex, lastIndex);
  const npage = Math.ceil(leave.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  async function getLeave() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/leave", requestOptions)
      .then((response) => response.json())
      .then((result) => setLeave(result))
      .catch((error) => console.log("error", error));
  }

  const deleteLeave = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`https://project-test-1.herokuapp.com/leave/delete/${id}`, requestOptions).then(
      (response) => setDeleteL(response.data)
    );
  };

  function prePage() {
    if (page !== firstIndex) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page !== lastIndex) {
      setPage(page + 1);
    }
  }

  return (
    <>
      <AdminNavbar />
      
        <div className="container d-flex flex-row-reverse bd-highlight">
          <Link to="/admin/addleave" className="btn btn-primary form-container">
            เพิ่มหัวข้อการลา
          </Link>
        </div>
        <br />
        <div className="container">
        <div className="row">
          
          {records.map((val) => {
            if (val.l_limit_m && val.l_limit_l !== null) {
              return (
                <div className="col-md-4" key={val.historyId}>
                  <div className="card shadow-lg bg-white">
                    <h3 className="card-header">{val.l_subject}</h3>
                    <div className="card-body">
                      <h4 className="card-title">
                        <b>เกณฑ์การลารายเดือน</b>
                      </h4>
                      <p className="card-text">{val.l_limit_m}</p>
                      <h4 className="card-title">
                        <b>เกณฑ์การลารายปี</b>
                      </h4>
                      <p className="card-text">{val.l_limit_y}</p>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                          onClick={() =>
                            Swal.fire({
                              title: "คุณต้องการลบทีมใช่หรือไม่?",
                              // text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "ใช่! ฉันต้องการลบ",
                              cancelButtonText: "ยกเลิก",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteLeave(val.historyId);
                                Swal.fire(
                                  "ลบสำเร็จ!",
                                  "คุณได้ลบทีมสำเร็จ",
                                  "success"
                                );
                              }
                            })
                          }
                          className="btn btn-danger"
                        >
                          ลบ
                        </button>
                        <Link
                          to={"/admin/leave/edit/" + val.historyId}
                          className="btn btn-warning "
                        >
                          แก้ไขเกณฑ์การลา
                        </Link>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              );
            } else {
              return null
            }
          })}
          <nav>
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>
                &laquo;
              </a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${page === n ? "active" : ""}`} key={i}>
                <a href="#" className="page-link" onClick={() => setPage(n)}>
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
        </div>
        <div />
      </div>
    </>
  );
};

export default Leave;

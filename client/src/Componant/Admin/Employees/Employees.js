import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Employees.css"
const Employees = () => {
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
      getUsers()
  }, []);

  const [employeeList, setEmployeeList] = useState([]);

  const [page, setPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = page * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = employeeList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(employeeList.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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

  function prePage() {
    if (page !== firstIndex) {
      if (page !== 1) {
        setPage(page - 1);
      }
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
        <Link to="/admin/addemployee" className="btn btn-primary form-container">
          เพิ่มพนักงาน
        </Link>
      </div>
      <br/>
      <div className="form-container">
        <form className="form-signin shadow-lg p-3 mb-5 bg-white">
          <table className="table" key="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">รูป</th>
                <th scope="col">ชื่อ-นามสกุล</th>
                <th scope="col">ตำแหน่งงาน</th>
                <th scope="col">ตำแหน่ง</th>
                <th scope="col">เบอร์โทร</th>
                <th scope="col">อีเมล</th>
                <th scope="col">สถานะ</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {records.map((val) => {
                const status = val.active ? "greenDot" : "redDot"
                  // var date = new Date(val.birthday);

                  // const result = date.toLocaleDateString("th-TH", {
                  //   year: "numeric",
                  //   month: "long",
                  //   day: "numeric",
                  // });
                if(val.isadmin !== 1) {
                  return (
                    <tr key={val.employeeid}>
                      {/* <th scope="row">{val.isadmin ? null : `${val.employeeid}`}</th> */}
                      <th scope="row">{val.employeeid - 1}</th>
                      <td>
                        <Link to={"/admin/employee/uploadpic/" + val.employeeid}>
                          {val.pic ? (
                            <img
                              src={`https://project-test-1.herokuapp.com/image/` + val.pic}
                              width="50"
                              height="50"
                            />
                          ) : (
                            <img
                              src="https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png"
                              width="50"
                              height="50"
                            />
                          )}
                        </Link>
                      </td>
                      <td>{val.employeeName}</td>
                      {/* <td>{val.gender ? "ชาย" : "หญิง"}</td> */}
                      {/* <td input type={date}>{val.birthday.substring(0, 10)}</td> */}
                      {/* <td>{result}</td> */}
                      <td>{val.jobPosition}</td>
                      <td>{val.position}</td>
                      <td>{val.phoneNo}</td>
                      <td>{val.email}</td>
                      <td><span className={status}>{val.active ? "เปิดใช้งาน" : "ปิดใช้งาน"}</span></td>
                      <td>
                        <Link
                          className="btn btn-success me-2"
                          to={"/admin/employee/info/" + val.employeeid}
                        >
                          ดูข้อมูล
                        </Link>
                        <Link
                          className="btn btn-warning me-2"
                          to={"/admin/employee/edit/" + val.employeeid}
                        >
                          แก้ไข
                        </Link>
                        <Link
                          className="btn btn-warning"
                          to={"/admin/employee/edit/password/" + val.employeeid}
                        >
                          แก้ไขรหัสผ่าน
                        </Link>
                      </td>
                    </tr>
                  );
                }
                
              })}
            </tbody>
          </table>
          <nav>
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <a  className="page-link" onClick={prePage}>
                &laquo;
              </a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${page === n ? "active" : ""}`} key={i}>
                <a  className="page-link" onClick={() => setPage(n)}>
                  {n}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a  className="page-link" onClick={nextPage}>
                &raquo;
              </a>
            </li>
          </ul>
        </nav>
          </form>
        </div>

    </>
  );
};

export default Employees;

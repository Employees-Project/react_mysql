import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./HREmployees.css"
import Navbar from "../Navbar/Navbar";
const HREmployees = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("HR");
    fetch("https://project-test-1.herokuapp.com/authen/hr", {
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
          localStorage.removeItem("HR");
          navigate("/Login");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
      getUsers()
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
      <Navbar />
      <div className="container d-flex flex-row-reverse bd-highlight">
        <Link to="/addemployee" className="btn btn-primary form-container">
          เพิ่มพนักงาน
        </Link>
      </div>
      <br/>
      <div className="form-container">
        <form className="form-signin">
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
              {employeeList.map((val) => {
                //   var date = new Date(val.birthday);

                //   const result = date.toLocaleDateString("th-TH", {
                //     year: "numeric",
                //     month: "long",
                //     day: "numeric",
                //   });

                return (
                  <tr>
                    {/* <th scope="row">{val.isadmin ? null : `${val.employeeid}`}</th> */}
                    <th scope="row">{val.employeeid}</th>
                    <td>
                      <Link to={"/employee/uploadpic/" + val.employeeid}>
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
                    <td>
                      <Link
                        className="btn btn-success me-2"
                        to={"/employee/info/" + val.employeeid}
                      >
                        ดูข้อมูล
                      </Link>
                      <Link
                        className="btn btn-warning"
                        to={"/employee/edit/" + val.employeeid}
                      >
                        แก้ไข
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </form>
        </div>

    </>
  );
};

export default HREmployees;

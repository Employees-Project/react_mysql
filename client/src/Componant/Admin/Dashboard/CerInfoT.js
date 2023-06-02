import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CerInfoT = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data2, setData2] = useState([]);
  const [teamname, setTeamname] = useState("");
  const [leadername, setLeadername] = useState(null);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);
  const [member3, setMember3] = useState(null);
  const [member4, setMember4] = useState(null);
  const [member5, setMember5] = useState(null);
  const [selectMember1, setSelectMember1] = useState(true);
  const [selectMember2, setSelectMember2] = useState(true);
  const [selectMember3, setSelectMember3] = useState(true);

  const [data, setData] = useState([]);

  function checkMember3() {
    if (member3) {
        setSelectMember1(false)
    }
  }

  function checkMember4() {
    if (member4) {
        setSelectMember2(false)
    }
  }

  function checkMember5() {
    if (member5) {
        setSelectMember3(false)
    }
  }

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
    getTeam();
    getUsers();
    checkMember3()
    checkMember4()
    checkMember5()
  }, []);

  async function getTeam() {
    await fetch(`https://project-test-1.herokuapp.com/team/${id}`).then(
      (result) => {
        result.json().then((resp) => {
          setData2(resp);
          setTeamname(resp[0].teamname);
          setLeadername(resp[0].leadername);
          setMember1(resp[0].member1);
          setMember2(resp[0].member2);
          setMember3(resp[0].member3);
          setMember4(resp[0].member4);
          setMember5(resp[0].member5);
        });
      }
    );
  }

  async function getUsers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/users", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>
              ข้อมูลใบประกาศนียบัตรของทีม <b>{teamname}</b>
            </h2>
            <hr />
          </div>
          <div>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {data.map((leader) => {
                return (
                  <b>
                    {" "}
                    {leadername === leader.employeeId
                      ? leader.employeeName
                      : null}
                  </b>
                );
              })}
            </h2>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <hr />
          <div>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {data.map((m1) => {
                return (
                  <b> {member1 === m1.employeeId ? m1.employeeName : null}</b>
                );
              })}
            </h2>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <hr />
          <div>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {data.map((m2) => {
                return (
                  <b> {member2 === m2.employeeId ? m2.employeeName : null}</b>
                );
              })}
            </h2>
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <div className="col-md-6">
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <hr hidden={selectMember1}/>
          <div hidden={selectMember1}>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {member3
                ? data.map((m3) => {
                    return (
                      <b> {member3 === m3.employeeId ? m3.employeeName : null}
                      </b>
                    );
                  })
                : null}
            </h2>
          </div>
          <div className="col-md-6" hidden={selectMember1}>
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <hr hidden={selectMember2}/>
          <div hidden={selectMember2}>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {member4
                ? data.map((m4) => {
                    return (
                      <b> {member4 === m4.employeeId ? m4.employeeName : null}
                      </b>
                    );
                  })
                : null}
            </h2>
          </div>
          <div className="col-md-6" hidden={selectMember2}>
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <hr hidden={selectMember3} />
          <div hidden={selectMember3}>
            <h2>
              ข้อมูลใบประกาศนียบัตรของ
              {member5
                ? data.map((m5) => {
                    return (
                      <b>
                        {" "}
                        {member5 === m5.employeeId ? m5.employeeName : null}
                      </b>
                    );
                  })
                : null}
            </h2>
          </div>
          <div className="col-md-6" hidden={selectMember3}>
            <div className="card shadow-lg bg-white">
              <h3 className="card-header">{"ชื่อใบประกาศนียบัตร"}</h3>
              <br />
            </div>
            <br />
          </div>
          <Link to="/admin/" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default CerInfoT;

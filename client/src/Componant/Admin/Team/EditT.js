import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditT = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [teamname, setTeamname] = useState("");
  const [leadername, setLeadername] = useState(null);
  console.log("🚀 ~ file: EditT.js:13 ~ EditT ~ leadername:", leadername)
  const [member1, setMember1] = useState(null);
  console.log("🚀 ~ file: EditT.js:15 ~ EditT ~ member1:", member1)
  const [member2, setMember2] = useState(null);
  console.log("🚀 ~ file: EditT.js:17 ~ EditT ~ member2:", member2)
  const [member3, setMember3] = useState(null);
  const [member4, setMember4] = useState(null);
  const [member5, setMember5] = useState(null);
  const [selectMember1, setSelectMember1] = useState(true);
  const [selectMember2, setSelectMember2] = useState(true);
  const [selectMember3, setSelectMember3] = useState(true);
  const [selectMember4, setSelectMember4] = useState(true);

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
  }, []);

  async function getTeam() {
    await fetch(`https://project-test-1.herokuapp.com/team/${id}`).then(
      (result) => {
        result.json().then((resp) => {
          // console.warn(resp)
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

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    teamname: teamname,
    leadername: leadername,
    member1: member1,
    member2: member2,
    member3: member3,
    member4: member4,
    member5: member5,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const updateTeam = (event) => {
    event.preventDefault();

    if (teamname === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "กรุณาใส่ชื่อทีม",
      });
    } else if (
      leadername === member1 ||
      leadername === member2 ||
      leadername === member3 ||
      leadername === member4 ||
      leadername === member5
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "ไม่สามารถเพิ่มหัวหน้าทีมในสมาชิกได้",
      });
    } else if (member1 === null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "กรุณาเลือกสมาชิกในทีมอย่างน้อย 2 คน",
      });
    } else if (member2 === null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "กรุณาเลือกสมาชิกในทีมอย่างน้อย 2 คน",
      });
    } else if (
      member1 === member2 ||
      member1 === member3 ||
      member1 === member4 ||
      member1 === member5
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "ไม่สามารถเพิ่มสมาชิกในทีมคนเดียวกันได้",
      });
    } else if (
      member2 === member1 ||
      member2 === member3 ||
      member2 === member4 ||
      member2 === member5
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "เพิ่มทีมไม่สำเร็จ",
        text: "ไม่สามารถเพิ่มสมาชิกในทีมคนเดียวกันได้",
      });
    } else if (member3 !== null) {
      if (
        member3 === member1 ||
        member3 === member2 ||
        member3 === member4 ||
        member3 === member5
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "เพิ่มทีมไม่สำเร็จ",
          text: "ไม่สามารถเพิ่มสมาชิกในทีมคนเดียวกันได้",
        });
      }
    } else if (member4 !== null) {
      if (
        member4 === member1 ||
        member4 === member2 ||
        member4 === member3 ||
        member4 === member5
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "เพิ่มทีมไม่สำเร็จ",
          text: "ไม่สามารถเพิ่มสมาชิกในทีมคนเดียวกันได้",
        });
      }
    } else if (member5 !== null) {
      if (
        member5 === member1 ||
        member5 === member2 ||
        member5 === member3 ||
        member5 === member4
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "เพิ่มทีมไม่สำเร็จ",
          text: "ไม่สามารถเพิ่มสมาชิกในทีมคนเดียวกันได้",
        });
      }
    } else {
      fetch(
        `https://project-test-1.herokuapp.com/update/team/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "error") {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "ชื่อทีมนี้ถูกใช้ไปแล้ว",
            });
          }
          if (result.status === "Success") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "แก้ไขทีมสำเร็จ",
              timer: 2500,
            });
            navigate("/admin/team");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>เพิ่มทีม</h2>
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="teamname">
              ชื่อทีม
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={teamname}
              required
              onChange={(event) => {
                setTeamname(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">หัวหน้าทีม</label>
            <select
              className="form-select"
              htmlFor="leadername"
              value={leadername}
              required
              onChange={(event) => {
                setLeadername(parseInt(event.target.value));
              }}
            >
              <option hidden>กรุณาเลือกหัวหน้าทีม</option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 1</label>
            <select
              className="form-select"
              htmlFor="member1"
              value={member1}
              onChange={(event) => {
                setSelectMember1(false);
                setMember1(parseInt(event.target.value));
              }}
            >
              <option hidden>กรุณาเลือกสมาชิกในทีม 1</option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>
          <div
            className="col-md-6"
            hidden={selectMember1 ? setSelectMember1(false) : null}
          >
            <label className="form-label">สมาชิกในทีม 2</label>
            <select
              className="form-select"
              htmlFor="member1"
              value={member2}
              required
              onChange={(event) => {
                setSelectMember2(false);
                setMember2(parseInt(event.target.value));
              }}
            >
              <option hidden>กรุณาเลือกสมาชิกในทีม 2</option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>
          <div className="col-md-6" hidden={selectMember2}>
            <label className="form-label">สมาชิกในทีม 3</label>
            <select
              className="form-select"
              htmlFor="member3"
              value={member3}
              onChange={(event) => {
                setSelectMember3(false);
                setMember3(parseInt(event.target.value));
              }}
            >
              <option hidden>กรุณาเลือกสมาชิกในทีม 3</option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>
          <div className="col-md-6" hidden={selectMember3}>
            <label className="form-label">สมาชิกในทีม 4</label>
            <select
              className="form-select"
              htmlFor="member4"
              value={member4}
              required
              onChange={(event) => {
                setSelectMember4(false);
                setMember4(parseInt(event.target.value));
              }}
            >
              <option hidden>
                กรุณาเลือกสมาชิกในทีม 4
              </option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>
          <div className="col-md-6" hidden={selectMember4}>
            <label className="form-label">สมาชิกในทีม 5</label>
            <select
              className="form-select"
              htmlFor="member5"
              value={member5}
              onChange={(event) => {
                setMember5(parseInt(event.target.value));
              }}
            >
              <option hidden>
                กรุณาเลือกสมาชิกในทีม 5
              </option>
              {data.map((val) => {
                if (val.active === 1) {
                  return <option value={val.employeeid} key={val.employeeid}>{val.employeeName}</option>;
                }
              })}
            </select>
          </div>

          <button onClick={updateTeam} className="btn btn-success">
            แก้ไขทีม
          </button>
          <Link to="/admin/team" className="btn btn-primary">
            กลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditT;

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
  const [leadername, setLeadername] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const [member5, setMember5] = useState("");
  const [leader, setLeader] = useState("");

  function getUsers() {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
    
      fetch("http://localhost:3000/users", requestOptions)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
  }

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
    getTeam();
    getUsers()
  }, []);

  function getTeam() {
    fetch(`http://localhost:3000/team/${id}`).then((result) => {
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
        setLeader(resp[0].leader);
      });
    });
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
    leader: leader,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const updateTeam = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/update/team/${id}`, requestOptions).then(
      Swal.fire({
        position: "center",
        icon: "success",
        title: "แก้ไขทีมสำเร็จ",
        timer: 2500,
      }).then(navigate("/admin/team"))
    );
    
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container1">
        <form className="form-signin row g-3">
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
                setLeadername(event.target.value);
              }}
            >
              <option>กรุณาเลือกหัวหน้าทีม</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 3</label>
            <select
              className="form-select"
              htmlFor="member3"
              value={member3}
              onChange={(event) => {
                setMember3(event.target.value);
              }}
            >
              <option value={""}>กรุณาเลือกสมาชิกในทีม 3</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 1</label>
            <select
              className="form-select"
              htmlFor="member1"
              value={member1}
              required
              onChange={(event) => {
                setMember1(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 1</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 4</label>
            <select
              className="form-select"
              htmlFor="member4"
              value={member4}
              onChange={(event) => {
                setMember4(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 4</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 2</label>
            <select
              className="form-select"
              htmlFor="member2"
              value={member2}
              required
              onChange={(event) => {
                setMember2(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 2</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">สมาชิกในทีม 5</label>
            <select
              className="form-select"
              htmlFor="member5"
              value={member5}
              onChange={(event) => {
                setMember5(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 5</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label">กรุณายืนยันชื่อหัวหน้าทีม</label>
            <select
              className="form-select"
              htmlFor="leader"
              required
              onChange={(event) => {
                setLeader(event.target.value);
              }}
            >
              <option>กรุณายืนยันชื่อหัวหน้าทีม</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>

          <button onClick={updateTeam} class="btn btn-success">
            Update Team
          </button>
          <Link to="/admin/team" className="btn btn-primary">
            Back
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditT;

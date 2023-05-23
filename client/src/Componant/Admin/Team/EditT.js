import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditT = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  console.log("🚀 ~ file: EditT.js:11 ~ EditT ~ data2:", data2)
  const [teamname, setTeamname] = useState("");
  const [leadername, setLeadername] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const [member5, setMember5] = useState("");
  const [selectMember1, setSelectMember1] = useState(true);
  const [selectMember2, setSelectMember2] = useState(true);
  const [selectMember3, setSelectMember3] = useState(true);
  const [selectMember4, setSelectMember4] = useState(true);

  async function getUsers() {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
    
      await fetch("https://long-teal-cormorant-garb.cyclic.app/users", requestOptions)
        .then((response) => response.json())
        .then((result) => setData(result))
        .catch((error) => console.log("error", error));
  }

  useEffect(() => {
        const token = localStorage.getItem("Admin");
        fetch("https://long-teal-cormorant-garb.cyclic.app/authen", {
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
    getTeam()
    getUsers()
  }, []);

  async function getTeam() {
    await fetch(`https://long-teal-cormorant-garb.cyclic.app/team/${id}`).then((result) => {
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
    member5: member5
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const updateTeam = (event) => {
    event.preventDefault();
    fetch(`https://long-teal-cormorant-garb.cyclic.app/update/team/${id}`, requestOptions).then(
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
      <div className="form-container">
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
            <label className="form-label">สมาชิกในทีม 1</label>
            <select
              className="form-select"
              htmlFor="member1"
              value={member1}
              onChange={(event) => {
                setSelectMember1(false)
                setMember1(event.target.value);
              }}
            >
              <option value={""}>กรุณาเลือกสมาชิกในทีม 1</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
              })}
            </select>
          </div>
          <div className="col-md-6" hidden={selectMember1}>
            <label className="form-label">สมาชิกในทีม 2</label>
            <select
              className="form-select"
              htmlFor="member1"
              value={member2}
              required
              onChange={(event) => {
                setSelectMember2(false)
                setMember2(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 2</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
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
                setSelectMember3(false)
                setMember3(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 3</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
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
                setSelectMember4(false)
                setMember4(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 4</option>
              {data.map((val) => {
                return <option>{val.employeeName}</option>;
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
                setMember5(event.target.value);
              }}
            >
              <option>กรุณาเลือกสมาชิกในทีม 5</option>
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

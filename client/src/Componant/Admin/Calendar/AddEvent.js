import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Calendar.css";

const AddEvent = () => {
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
            title: "ไม่สามารถเข้าใช้งานได้",
            text: "กรุณาลงชื่อก่อนเข้าใช้งาน",
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
  }, []);
  

  const [subject, setSubject] = useState("");
  // const [location, setLocation] = useState("");
  const [team, setTeam] = useState(0);
  const [teamList, setTeamList] = useState([]);
  const [canEdit, setCanEdit] = useState(null);
  const [s_time, setS_time] = useState("");
  const [e_time, setE_time] = useState("");
  const [detail, setDetail] = useState("");
  const [latitude, setLatitude] = useState(13.9647757032);
  const [longitude, setLongitude] = useState(100.59594388181007);

  async function getTeam() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/teams", requestOptions)
      .then((response) => response.json())
      .then((result) => setTeamList(result))
      .catch((error) => console.log("error", error));
  }

  const addEvent = (event) => {
    event.preventDefault();
    if (
      subject === "" ||
      s_time === "" ||
      e_time === "" ||
      detail === "" ||
      latitude === "" ||
      longitude === ""
    ) {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่ม Event ได้",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else if (s_time > e_time) {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่ม Event ได้",
        text: "วัน/เวลาเริ่มงานและเลิกงานไม่ถูกต้อง",
      });
    } else if (s_time === e_time) {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่ม Event ได้",
        text: "วัน/เวลาเริ่มงานและเลิกงานไม่ถูกต้อง",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "เพิ่ม Event สำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        subject: subject,
        teamID: team,
        s_time: s_time,
        e_time: e_time,
        detail: detail,
        latitude: latitude,
        longitude: longitude,
        canEdit: canEdit
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://project-test-1.herokuapp.com/add/event", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result.status === "ok") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "เพิ่ม Event สำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate("/admin/calendar");
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
            <h2>Add Event</h2>
          </div>
          <div className="col-md-3">
            <label className="form-label">หัวข้อวัน</label>
            <select
              className="form-select"
              htmlFor="jobPosition"
              required
              onChange={(event) => {
                setCanEdit(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option value={0}>วันทำงาน</option>
              <option value={1}>วันหยุด</option>
              <option value={2}>วันที่ลาล่วงหน้าได้</option>
            </select>
          </div>
          {canEdit === "0" ? <div className="col-md-3">
            <label htmlfor="" className="form-label">
              หัวข้อ
            </label>
            <input
              className="form-control"
              name="subject"
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div> : <div className="col-md-9">
            <label htmlfor="" className="form-label">
              หัวข้อ
            </label>
            <input
              className="form-control"
              name="subject"
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </div>}
          
          {/* <div className="col-md-6">
            <label htmlfor="" className="form-label">
              สถานที่ทำงาน
            </label>
            <input
              className="form-control"
              name="location"
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div> */}
          {canEdit === "0" ? <div className="col-md-6">
            <label className="form-label">ทีมในการทำงาน</label>
            <select
              className="form-select"
              htmlFor="team"
              required
              onChange={(event) => {
                setTeam(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือกทีมในการทำงาน</option>
              {teamList.map((val) => {
                return <option value={val.teamID} key={val.teamID}>{val.teamname}</option>;
              })}
            </select>
          </div> : null}
          {canEdit === "1" ||  canEdit === "2" ? <div class="col-md-6">
            <label htmlfor="" className="form-label">
              วัน/เวลา
            </label>
            <input
              className="form-control"
              id="time"
              label=""
              type="datetime-local"
              name="s_time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                setS_time(e.target.value)
              }}
            />
          </div> : <div class="col-md-6">
            <label htmlfor="" className="form-label">
              เวลาเริ่มงาน
            </label>
            <input
              className="form-control"
              id="time"
              label=""
              type="datetime-local"
              name="s_time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                setS_time(e.target.value)
              }}
            />
          </div>}
          { canEdit === "1" ||  canEdit === "2" ? <div className="col-md-6">
            <label htmlfor="" className="form-label">
              ถึงวัน/เวลา
            </label>
            <input
              className="form-control"
              id="time"
              type="datetime-local"
              name="e_time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                setE_time(e.target.value)
              }}
            />
          </div> : <div className="col-md-6">
            <label htmlfor="" className="form-label">
              เวลาเลิกงาน
            </label>
            <input
              className="form-control"
              id="time"
              type="datetime-local"
              name="e_time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                setE_time(e.target.value)
              }}
            />
          </div>}
          { canEdit === "1" ||  canEdit === "2" ? <div className="col-md-12">
            <label htmlfor="" className="form-label">
              รายละเอียด
            </label>
            <input
              className="form-control"
              name="detail"
              onChange={(event) => {
                setDetail(event.target.value);
              }}
            />
          </div> : <div className="col-md-12">
            <label htmlfor="" className="form-label">
              รายละเอียดงาน
            </label>
            <input
              className="form-control"
              name="detail"
              onChange={(event) => {
                setDetail(event.target.value);
              }}
            />
          </div>}
          
          {canEdit === "0" ? <div className="col-md-6">
            <label htmlfor="" className="form-label">
              ละจิจูด
            </label>
            <input
              className="form-control"
              name="latitude"
              defaultValue={13.9647757032}
              onChange={(event) => {
                setLatitude(event.target.value);
              }}
            />
          </div> : null}
          {canEdit === "0" ? <div className="col-md-6">
            <label htmlfor="" className="form-label">
              ลองจิจูด
            </label>
            <input
              className="form-control"
              name="longitude"
              defaultValue={100.59594388181007}
              onChange={(event) => {
                setLongitude(event.target.value);
              }}
            />
          </div> : null}
          
          <button className="btn btn-success btn-block" onClick={addEvent}>
            เพิ่มข้อมูล
          </button>
          <Link to="/admin/calendar" className="btn btn-primary">
            กลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddEvent;

import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Calendar.css";

const EditEvent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [teamID, setTeamID] = useState(0);
  const [teamList, setTeamList] = useState([]);
  const [canEdit, setCanEdit] = useState(null);
  const [s_time, setS_time] = useState("");
  const [e_time, setE_time] = useState("");
  const [detail, setDetail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const S_TIME = s_time.toString().slice(0, -8);
  const E_TIME = e_time.toString().slice(0, -8);

  const updateEvent = (event) => {
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
      fetch(
        `https://project-test-1.herokuapp.com/update/event/${id}`,
        requestOptions
      ).then(
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่มข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2500,
        })
      );
      navigate("/admin/calendar");
    }
  };

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
    getEvent();
    getTeam();
  }, []);


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

  function getEvent() {
    fetch(`https://project-test-1.herokuapp.com/event/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setSubject(resp[0].subject);
        setCanEdit(resp[0].canEdit);
        setTeamID(resp[0].teamID);
        setS_time(resp[0].s_time);
        setE_time(resp[0].e_time);
        setDetail(resp[0].detail);
        setLatitude(resp[0].latitude);
        setLongitude(resp[0].longitude);
      });
    });
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    subject: subject,
    teamID: teamID,
    s_time: s_time,
    e_time: e_time,
    detail: detail,
    latitude: latitude,
    longitude: longitude,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
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
              value={canEdit}
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
          {canEdit === 0 ? (
            <div className="col-md-3">
              <label htmlfor="" className="form-label">
                หัวข้อ
              </label>
              <input
                className="form-control"
                name="subject"
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
              />
            </div>
          ) : (
            <div className="col-md-9">
              <label htmlfor="" className="form-label">
                หัวข้อ
              </label>
              <input
                className="form-control"
                name="subject"
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);
                }}
              />
            </div>
          )}
          {canEdit === 0 ? (
            <div className="col-md-6">
              <label className="form-label">ทีมในการทำงาน</label>
              <select
                className="form-select"
                htmlFor="team"
                value={teamList.map((val) => {
                  if (teamID === val.teamID) {
                    return val.teamID
                  }
                })}
                required
                onChange={(event) => {
                  setTeamID(event.target.value);
                }}
              >
                <option hidden>กรุณาเลือกทีมในการทำงาน</option>
                {teamList.map((val) => {
                  return (
                    <option value={val.teamID} key={val.teamID}>
                      {val.teamname}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
          {canEdit === 1 || canEdit === 2 ? (
            <div class="col-md-6">
              <label htmlfor="" className="form-label">
                วัน/เวลา
              </label>
              <input
                className="form-control"
                id="time"
                label=""
                type="datetime-local"
                name="s_time"
                defaultValue={S_TIME}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 476 }}
                onChange={(e) => {
                  setS_time(e.target.value);
                }}
              />
            </div>
          ) : (
            <div class="col-md-6">
              <label htmlfor="" className="form-label">
                เวลาเริ่มงาน
              </label>
              <input
                className="form-control"
                id="time"
                label=""
                type="datetime-local"
                name="s_time"
                defaultValue={S_TIME}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 476 }}
                onChange={(e) => {
                  setS_time(e.target.value);
                }}
              />
            </div>
          )}
          {canEdit === 1 || canEdit === 2 ? (
            <div className="col-md-6">
              <label htmlfor="" className="form-label">
                ถึงวัน/เวลา
              </label>
              <input
                className="form-control"
                id="time"
                type="datetime-local"
                name="e_time"
                defaultValue={E_TIME}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 476 }}
                onChange={(e) => {
                  setE_time(e.target.value);
                }}
              />
            </div>
          ) : (
            <div className="col-md-6">
              <label htmlfor="" className="form-label">
                เวลาเลิกงาน
              </label>
              <input
                className="form-control"
                id="time"
                type="datetime-local"
                name="e_time"
                defaultValue={E_TIME}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                sx={{ width: 476 }}
                onChange={(e) => {
                  setE_time(e.target.value);
                }}
              />
            </div>
          )}
          {canEdit === 1 || canEdit === 2 ? (
            <div className="col-md-12">
              <label htmlfor="" className="form-label">
                รายละเอียด
              </label>
              <input
                className="form-control"
                name="detail"
                value={detail}
                onChange={(event) => {
                  setDetail(event.target.value);
                }}
              />
            </div>
          ) : (
            <div className="col-md-12">
              <label htmlfor="" className="form-label">
                รายละเอียดงาน
              </label>
              <input
                className="form-control"
                name="detail"
                value={detail}
                onChange={(event) => {
                  setDetail(event.target.value);
                }}
              />
            </div>
          )}

          {canEdit === 0 ? (
            <div className="col-md-6">
              <label htmlfor="" className="form-label">
                ละจิจูด
              </label>
              <input
                className="form-control"
                name="latitude"
                value={latitude}
                onChange={(event) => {
                  setLatitude(event.target.value);
                }}
              />
            </div>
          ) : null}
          {canEdit === 0 ? (
            <div className="col-md-6">
              <label htmlfor="" className="form-label">
                ลองจิจูด
              </label>
              <input
                className="form-control"
                name="longitude"
                value={longitude}
                defaultValue={100.59594388181007}
                onChange={(event) => {
                  setLongitude(event.target.value);
                }}
              />
            </div>
          ) : null}
          <button onClick={updateEvent} className="btn btn-success btn-block">
            แก้ไขข้อมูล
          </button>
          <Link to="/admin/calendar" className="btn btn-primary">
            กลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditEvent;

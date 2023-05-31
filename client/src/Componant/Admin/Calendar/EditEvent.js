import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./Calendar.css";

const EditEvent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [s_time, setS_time] = useState("");
  const [e_time, setE_time] = useState("");
  const [detail, setDetail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getDateS_time = (val) => {
    if (date) {
      setS_time(date + " " + val);
    }
  };
  const getDateE_time = (val) => {
    if (date) {
      setE_time(date + " " + val);
    }
  };

  const updateEvent = (event) => {
    event.preventDefault();

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
  }, []);

  function getEvent() {
    fetch(`https://project-test-1.herokuapp.com/event/${id}`).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setSubject(resp[0].subject);
        setDate(resp[0].date);
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
    date: date,
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
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlfor="" class="form-label">
              วันที่
            </label>
            <input
              className="form-control"
              id="date"
              type="date"
              name="date"
              defaultValue={date}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>
          <div class="col-md-6">
            <label htmlfor="" className="form-label">
              เวลาเริ่มงาน
            </label>
            <input
              className="form-control"
              id="time"
              label=""
              type="time"
              name="s_time"
              defaultValue="00:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                getDateS_time(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlfor="" className="form-label">
              เวลาเลิกงาน
            </label>
            <input
              className="form-control"
              id="time"
              type="time"
              name="e_time"
              defaultValue="00:00"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 476 }}
              onChange={(e) => {
                getDateE_time(e.target.value);
              }}
            />
          </div>
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
          <div className="col-md-6">
            <label htmlfor="" className="form-label">
              ลองจิจูด
            </label>
            <input
              className="form-control"
              name="longitude"
              value={longitude}
              onChange={(event) => {
                setLongitude(event.target.value);
              }}
            />
          </div>
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

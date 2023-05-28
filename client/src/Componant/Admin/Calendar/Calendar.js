import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

export default function Calendar() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [s_time, setS_time] = useState("");
  const [e_time, setE_time] = useState("");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://project-test-1.herokuapp.com/events", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setData(result);
      data.map((events) => {
        setSubject(events.subject);
        setS_time(events.s_time);
        setE_time(events.e_time);
      });
    })
    .catch((error) => console.log("error", error));

  const events = [
    {
      title: subject,
      start: getDate(s_time),
      end: getDate(e_time),
    },
  ];

  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex flex-row-reverse bd-highlight">
          <Link
            to="/admin/addevent"
            className="btn btn-success btn-block topright"
          >
            เพิ่ม Event
          </Link>
        </div>
        <div className="container calendar">
        <form className="form shadow-lg p-3 mb-5 bg-white">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            themeSystem="Simplex"
            plugins={[dayGridPlugin]}
            events={events}
          />
          </form>
        </div>
      </div>
    </>
  );
}

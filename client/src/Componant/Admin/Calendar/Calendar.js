import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

export default function Calendar() {
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
    deleteEvent();
    getEvents();
  }, []);

  const [data, setData] = useState([]);

  async function getEvents() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => console.log("error", error));
  }

  async function deleteEvent(id) {
    var requestOptions = {
      method: "DELETE",
    };
    await fetch(
      `https://project-test-1.herokuapp.com/event/delete/${id}`,
      requestOptions
    )
    await getEvents()
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
              locale="th"
              timeZone="th"
              eventClick={function (info) {
                var eventObj = info.event;
                if (eventObj) {
                  Swal.fire({
                    className: "font-size",
                    title: "หัวข้อ" + " " + eventObj.title,
                    text: "รายละเอียดงาน" + " " + eventObj.groupId,
                    footer: `เริ่มงาน ${eventObj.textColor} - เลิกงาน ${eventObj.backgroundColor}`,
                    // icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#fcb103",
                    cancelButtonColor: "#f53d3d",
                    confirmButtonText: "แก้ไข",
                    cancelButtonText: "ลบข้อมูล",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/admin/calendar/edit/" + eventObj.id);
                    } else {
                      Swal.fire({
                        title: "คุณต้องการลบข้อมูลใช่หรือไม่?",
                        // text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "ใช่! ฉันต้องการลบ",
                        cancelButtonText: "ยกเลิก",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteEvent(eventObj.id);
                          Swal.fire(
                            "ลบสำเร็จ!",
                            "คุณได้ลบทีมสำเร็จ",
                            "success"
                          );
                        }
                      })
                      
                    }
                  });
                }
              }}
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                meridiem: false,
              }}
              buttonText={{ today: "วันนี้" }}
              defaultView="dayGridMonth"
              header={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              themeSystem="Simplex"
              plugins={[dayGridPlugin]}
              events={data.map((val) => {
                var date = new Date(val.s_time);

                const S_time = date.toLocaleTimeString(
                  "th-TH",
                  { timeZone: "Atlantic/St_Helena" },
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );

                var date1 = new Date(val.e_time);

                const E_time = date1.toLocaleTimeString(
                  "th-TH",
                  { timeZone: "Atlantic/St_Helena" },
                  {
                    hour: "numeric",
                    minute: "2-digit",
                  }
                );
                return {
                  title: `${val.subject}`,
                  start: `${val.s_time}`,
                  end: `${val.e_time}`,
                  textColor: S_time,
                  backgroundColor: E_time,
                  groupId: val.detail,
                  id: val.calendarID,
                  // canEdit = null เป็นวันทำงาน, canEdit = 0 เป็นวันหยุด, canEdit = 1 วันที่ลาล่วงหน้าได้
                  borderColor:
                    val.canEdit === 1
                      ? "#fcb103"
                      : val.canEdit === 0
                      ? "red"
                      : "green",
                };
              })}
            />
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./Noti.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Noti1() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const status = "Read";
  const [history, setHistory] = useState([]);
  
  // const [filterAll, setFilterAll] = useState("");

  const [page, setPage] = useState(1);
  const recordsPerPage = 5
  const lastIndex = page * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = history.slice(firstIndex, lastIndex)
  const npage = Math.ceil(history.length / recordsPerPage)
  const numbers = [...Array(npage).keys()].slice(1)

  const readStatus = (id) => {
    var raw = JSON.stringify({
      status: status,
    });

    var requestOptions = {
      method: "PUT",
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://project-test-1.herokuapp.com/history/update/status/${id}`,
      requestOptions
    ).catch((error) => console.log("error", error));
    getHistoryStatus0();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getHistoryStatus0() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://project-test-1.herokuapp.com/history", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setHistory(result);
      })
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
    getHistoryStatus0();
  }, []);

  function prePage() {
    if (page !== firstIndex) {
      if (page !== 1) {
        setPage(page - 1)
      }
    }
  }

  function nextPage() {
    if (page !== lastIndex) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <div className="form-signin shadow-lg p-3 mb-5 bg-white">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  style={{
                    font: "25px solid blue",
                    fontFamily: "Pridi, serif",
                  }}
                  label="การแจ้งเตือนทั้งหมด"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{
                    font: "25px solid blue",
                    fontFamily: "Pridi, serif",
                  }}
                  label="การแจ้งเตือนการลา"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{
                    font: "25px solid blue",
                    fontFamily: "Pridi, serif",
                  }}
                  label="การแจ้งพนักงานเข้าทำงาน"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {/* <div className="container d-flex flex-row-reverse bd-highlight">
                <select className="form-select" onChange={(event) => {
                  setFilterAll(event.target.value)
                }}>
                  <option selected value="">ทั้งหมด</option>
                  <option value="Not Read">ยังไม่ได้อ่าน</option>
                  <option value="Read">อ่านแล้ว</option>
                  <option value="Approve">อนุมัติแล้ว</option>
                  <option value="Not Approve">ไม่อนุมัติ</option>
                  <option value="เข้างาน">เข้างาน</option>
                  <option value="ออกงาน">ออกงาน</option>
                </select>
              </div>
              <br /> */}
              {records.map((val) => {
                if (val.employeeName !== null) {
                  if (val.status === "Read") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });

                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card leaveR">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {val.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{val.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ตรวจสอบแล้ว
                                <Link
                                  to={"/admin/noti/info/" + val.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.status === "Not Read") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card leaveN">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {val.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{val.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/" + val.historyId}
                                  className="btn btn-warning"
                                  onClick={() => readStatus(val.historyId)}
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.status === "Approve") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card approve1">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {val.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{val.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                อนุมัติ
                                <Link
                                  to={"/admin/noti/info/" + val.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.status === "Not Approve") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card approve0">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {val.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{val.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ไม่อนุมัติ
                                <Link
                                  to={"/admin/noti/info/" + val.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.r_subject === "เข้างาน") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-in">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {val.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.r_subject === "เข้างาน(สาย)") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-in-l">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {val.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (val.r_subject === "ออกงาน") {
                    var rawDate = new Date(val.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-out">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {val.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  }
                }
              })}
              <nav>
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={prePage}>&laquo;</a>
                  </li>
                  { numbers.map((n, i) => (
                    <li className={`page-item ${page === n ? "active" : ""}`} key={i}>
                      <a href="#" className="page-link" onClick={() => setPage(n)}>{n}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>&raquo;</a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {history.map((leave) => {
                if (leave.l_subject !== null) {
                  if (leave.status === "Read") {
                    var rawDate = new Date(leave.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card leaveR">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {leave.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {leave.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{leave.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ตรวจสอบแล้ว
                                <Link
                                  to={"/admin/noti/info/" + leave.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (leave.status === "Not Read") {
                    var rawDate = new Date(leave.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card leaveN">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {leave.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {leave.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{leave.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/" + leave.historyId}
                                  className="btn btn-warning"
                                  onClick={() => readStatus(leave.historyId)}
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (leave.status === "Approve") {
                    var rawDate = new Date(leave.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card approve1">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {leave.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {leave.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{leave.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                อนุมัติ
                                <Link
                                  to={"/admin/noti/info/" + leave.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (leave.status === "Not Approve") {
                    var rawDate = new Date(leave.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card approve0">
                            <div className="row g-3">
                              <h3 className="card-header col-md-6">
                                <b>หัวข้อการลา:</b> {leave.l_subject}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {leave.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              <h5 className="card-text">{leave.l_detail}</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ไม่อนุมัติ
                                <Link
                                  to={"/admin/noti/info/" + leave.historyId}
                                  className="btn btn-warning"
                                >
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {history.map((rollcall) => {
                if (rollcall.r_subject !== null) {
                  if (rollcall.r_subject === "เข้างาน") {
                    var rawDate = new Date(rollcall.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-in">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {rollcall.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {rollcall.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (rollcall.r_subject === "เข้างาน(สาย)") {
                    var rawDate = new Date(rollcall.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-in-l">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {rollcall.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {rollcall.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  } else if (rollcall.r_subject === "ออกงาน") {
                    var rawDate = new Date(rollcall.date);

                    const date = rawDate.toLocaleDateString("th-TH", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZone: "GMT",
                    });
                    return (
                      <div className="form-container">
                        <div className="col-sm">
                          <div className="card rollcall-out">
                            <div className="row g-3">
                              <h3 className="card-body col-md-6">
                                <b>หัวข้อ:</b> {rollcall.r_subject}
                              </h3>
                              <h5 className="card-body col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {rollcall.employeeName} {date}
                              </h5>
                            </div>
                          </div>
                          <br />
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}

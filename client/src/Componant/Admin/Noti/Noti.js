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
  const [page, setPage] = useState(1);

  const recordsPerPageAll = 5
  const lastIndexAll = page * recordsPerPageAll
  const firstIndexAll = lastIndexAll - recordsPerPageAll
  const recordsAll = history.slice(firstIndexAll, lastIndexAll)
  const npageAll = Math.ceil(history.length / recordsPerPageAll)
  const numbersAll = [...Array(npageAll).keys()].slice(1)

  const [leave, setLeave] = useState([]);
  const [pageLeave, setPageLeave] = useState(1);
  const recordsPerPageLeave = 5
  const lastIndexLeave = pageLeave * recordsPerPageLeave
  const firstIndexLeave = lastIndexLeave - recordsPerPageLeave
  const recordsLeave = leave.slice(firstIndexLeave, lastIndexLeave)
  const npageLeave = Math.ceil(leave.length / recordsPerPageLeave)
  const numbersLeave = [...Array(npageLeave + 1).keys()].slice(1)

  const [rollcall, setRollcall] = useState([]);
  const [pageRollcall, setPageRollcall] = useState(1);
  const recordsPerPageRollcall = 5
  const lastIndexRollcall = pageRollcall * recordsPerPageRollcall
  const firstIndexRollcall = lastIndexRollcall - recordsPerPageRollcall
  const recordsRollcall = rollcall.slice(firstIndexRollcall, lastIndexRollcall)
  const npageRollcall = Math.ceil(rollcall.length / recordsPerPageRollcall)
  const numbersRollcall = [...Array(npageRollcall + 1).keys()].slice(1)

  const [certificate, setCertificate] = useState([]);
  const [pageCertificate, setPageCertificate] = useState(1);
  const recordsPerPageCertificate = 2
  const lastIndexCertificate = pageCertificate * recordsPerPageCertificate
  const firstIndexCertificate = lastIndexCertificate - recordsPerPageCertificate
  const recordsCertificate = certificate.slice(firstIndexCertificate, lastIndexCertificate)
  const npageCertificate = Math.ceil(certificate.length / recordsPerPageRollcall)
  const numbersCertificate = [...Array(npageCertificate + 1).keys()].slice(1)
  
  // const [filterAll, setFilterAll] = useState("");

  // const recordsPerPage = 5
  // const lastIndex = page * recordsPerPage
  // const firstIndex = lastIndex - recordsPerPage
  // const records = history.slice(firstIndex, lastIndex)
  // const npage = Math.ceil(history.length / recordsPerPage)
  // const numbers = [...Array(npage).keys()].slice(1)

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

  function getLeave() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://project-test-1.herokuapp.com/leave", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLeave(result);
      })
      .catch((error) => console.log("error", error));
  }

  function getRollcall() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://project-test-1.herokuapp.com/rollcall", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRollcall(result);
      })
      .catch((error) => console.log("error", error));
  }

  function getCertificate() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://project-test-1.herokuapp.com/certificate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCertificate(result);
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
    getLeave()
    getRollcall()
    getCertificate()
  }, []);

  function prePageAll() {
    if (page !== firstIndexAll) {
      if (page !== 1) {
        setPage(page - 1)
      }
    }
  }

  function nextPageAll() {
    if (page !== lastIndexAll) {
      setPage(page + 1)
    }
  }

  function prePageLeave() {
    if (pageLeave !== firstIndexLeave) {
      if (pageLeave !== 1) {
        setPageLeave(pageLeave - 1)
      }
    }
  }

  function nextPageLeave() {
    if (pageLeave !== lastIndexLeave) {
      setPageLeave(pageLeave + 1)
    }
  }

  function prePageRollcall() {
    if (pageRollcall !== firstIndexRollcall) {
      if (pageRollcall !== 1) {
        setPageRollcall(pageRollcall - 1)
      }
    }
  }

  function nextPageRollcall() {
    if (pageRollcall !== lastIndexRollcall) {
      setPageRollcall(pageRollcall + 1)
    }
  }

  function prePageCertificate() {
    if (pageCertificate !== firstIndexCertificate) {
      if (pageCertificate !== 1) {
        setPageCertificate(pageCertificate - 1)
      }
    }
  }

  function nextPageCertificate() {
    if (pageCertificate !== lastIndexCertificate) {
      setPageCertificate(pageCertificate + 1)
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
                  label="การแจ้งเตือนพนักงานเข้าทำงาน"
                  {...a11yProps(2)}
                />
                <Tab
                  style={{
                    font: "25px solid blue",
                    fontFamily: "Pridi, serif",
                  }}
                  label="การแจ้งเตือนการผ่านการอบรม"
                  {...a11yProps(3)}
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
              {recordsAll.map((val) => {
                if (val.employeeName !== null) {
                  if (val.status === "Read" && val.certificateName === null && val.leader_approve === 1) {
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
                                  to={"/admin/noti/info/leave/" + val.historyId}
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
                  } else if (val.status === "Not Read" && val.certificateName === null && val.leader_approve === 1) {
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
                                  to={"/admin/noti/info/leave/" + val.historyId}
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
                  } else if (val.status === "Approve" && val.certificateName === null) {
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
                                  to={"/admin/noti/info/leave/" + val.historyId}
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
                  } else if (val.status === "Not Approve" && val.certificateName === null) {
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
                                  to={"/admin/noti/info/leave/" + val.historyId}
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
                  } else if (val.certificateName !== null && val.status === "Read" && val.leader_approve === 1) {
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
                                <b>หัวข้ออบรม:</b> {val.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ตรวจสอบแล้ว
                                <Link
                                  to={"/admin/noti/info/certificate/" + val.historyId}
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
                  } else if (val.certificateName !== null && val.status === "Not Read" && val.leader_approve === 1) {
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
                                <b>หัวข้ออบรม:</b> {val.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + val.historyId}
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
                  } else if (val.certificateName !== null && val.status === "Approve") {
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
                                <b>หัวข้ออบรม:</b> {val.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + val.historyId}
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
                  } else if (val.certificateName !== null && val.status === "Not Approve") {
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
                                <b>หัวข้ออบรม:</b> {val.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {val.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + val.historyId}
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
                  }
                }
              })}
              <nav>
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a  className="page-link" onClick={prePageAll}>&laquo;</a>
                  </li>
                  { numbersAll.map((n, i) => (
                    <li className={`page-item ${page === n ? "active" : ""}`} key={i}>
                      <a  className="page-link" onClick={() => setPage(n)}>{n}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a  className="page-link" onClick={nextPageAll}>&raquo;</a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {recordsLeave.map((leave) => {
                if (leave.l_subject !== null) {
                  if (leave.status === "Read" && leave.leader_approve === 1) {
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
                                  to={"/admin/noti/info/leave/" + leave.historyId}
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
                  } else if (leave.status === "Not Read" && leave.leader_approve === 1) {
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
                                  to={"/admin/noti/info/leave/" + leave.historyId}
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
                                  to={"/admin/noti/info/leave/" + leave.historyId}
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
                                  to={"/admin/noti/info/leave/" + leave.historyId}
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
              <nav>
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a  className="page-link" onClick={prePageLeave}>&laquo;</a>
                  </li>
                  { numbersLeave.map((n, i) => (
                    <li className={`page-item ${pageLeave === n ? "active" : ""}`} key={i}>
                      <a  className="page-link" onClick={() => setPageLeave(n)}>{n}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a  className="page-link" onClick={nextPageLeave}>&raquo;</a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
            <TabPanel value={value} index={2}>
              {recordsRollcall.map((rollcall) => {
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
              <nav>
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a  className="page-link" onClick={prePageRollcall}>&laquo;</a>
                  </li>
                  { numbersRollcall.map((n, i) => (
                    <li className={`page-item ${pageRollcall === n ? "active" : ""}`} key={i}>
                      <a  className="page-link" onClick={() => setPageRollcall(n)}>{n}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a  className="page-link" onClick={nextPageRollcall}>&raquo;</a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
            <TabPanel value={value} index={3}>
            {recordsCertificate.map((cer) => {
                if (cer.employeeName !== null) {
                  if (cer.certificateName !== null && cer.status === "Read" && cer.leader_approve === 1) {
                    var rawDate = new Date(cer.date);

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
                                <b>หัวข้ออบรม:</b> {cer.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {cer.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ตรวจสอบแล้ว
                                <Link
                                  to={"/admin/noti/info/certificate/" + cer.historyId}
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
                  } else if (cer.certificateName !== null && cer.status === "Not Read" && cer.leader_approve === 1) {
                    var rawDate = new Date(cer.date);

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
                                <b>หัวข้ออบรม:</b> {cer.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {cer.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + cer.historyId}
                                  className="btn btn-warning"
                                  onClick={() => readStatus(cer.historyId)}
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
                  } else if (cer.certificateName !== null && cer.status === "Approve") {
                    var rawDate = new Date(cer.date);

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
                                <b>หัวข้ออบรม:</b> {cer.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {cer.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + cer.historyId}
                                  className="btn btn-warning"
                                  onClick={() => readStatus(cer.historyId)}
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
                  } else if (cer.certificateName !== null && cer.status === "Not Approve") {
                    var rawDate = new Date(cer.date);

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
                                <b>หัวข้ออบรม:</b> {cer.certificateName}
                              </h3>
                              <h5 className="card-header col-md-6 d-flex flex-row-reverse">
                                ชื่อ: {cer.employeeName} {date}
                              </h5>
                            </div>
                            <div className="card-body">
                              {/* <h5 className="card-text">{val.certificatePic}</h5> */}
                              <h5 className="card-text">(รอใส่รูปภาพ)</h5>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                ยังไม่ได้ตรวจสอบ
                                <Link
                                  to={"/admin/noti/info/certificate/" + cer.historyId}
                                  className="btn btn-warning"
                                  onClick={() => readStatus(cer.historyId)}
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
                  }
                }
              })}
              <nav>
                <ul className="pagination justify-content-end">
                  <li className="page-item">
                    <a  className="page-link" onClick={prePageCertificate}>&laquo;</a>
                  </li>
                  { numbersCertificate.map((n, i) => (
                    <li className={`page-item ${pageCertificate === n ? "active" : ""}`} key={i}>
                      <a  className="page-link" onClick={() => setPageCertificate(n)}>{n}</a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a  className="page-link" onClick={nextPageCertificate}>&raquo;</a>
                  </li>
                </ul>
              </nav>
            </TabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}

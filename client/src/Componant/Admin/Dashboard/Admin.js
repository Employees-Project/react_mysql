import React, { useCallback, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./Admin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import Swal from "sweetalert2";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill="black"
        className="pie1"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill={fill}
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        className="pie1"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`จำนวน ${value}`}</text>
      <text
        className="pie1"
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(คิดเป็น ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function Admin() {
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);
  const [allEmployeeList, setAllEmployeeList] = useState([]);
  const [rollcallIn, setRollcallIn] = useState([]);
  const [leave1, setLeave1] = useState([]);
  const [rollcallYear, setRollcallYear] = useState([]);
  const [leaveYear, setLeaveYear] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const [historyRollcall1, setHistoryRollcall1] = useState([]);
  const [historyRollcall2, setHistoryRollcall2] = useState([]);
  const [historyRollcall3, setHistoryRollcall3] = useState([]);
  const [historyRollcall4, setHistoryRollcall4] = useState([]);
  const [historyRollcall5, setHistoryRollcall5] = useState([]);
  const [historyRollcall6, setHistoryRollcall6] = useState([]);
  const [historyRollcall7, setHistoryRollcall7] = useState([]);
  const [historyRollcall8, setHistoryRollcall8] = useState([]);
  const [historyRollcall9, setHistoryRollcall9] = useState([]);
  const [historyRollcall10, setHistoryRollcall10] = useState([]);
  const [historyRollcall11, setHistoryRollcall11] = useState([]);
  const [historyRollcall12, setHistoryRollcall12] = useState([]);

  const [historyLeave1, setHistoryLeave1] = useState([]);
  const [historyLeave2, setHistoryLeave2] = useState([]);
  const [historyLeave3, setHistoryLeave3] = useState([]);
  const [historyLeave4, setHistoryLeave4] = useState([]);
  const [historyLeave5, setHistoryLeave5] = useState([]);
  const [historyLeave6, setHistoryLeave6] = useState([]);
  const [historyLeave7, setHistoryLeave7] = useState([]);
  const [historyLeave8, setHistoryLeave8] = useState([]);
  const [historyLeave9, setHistoryLeave9] = useState([]);
  const [historyLeave10, setHistoryLeave10] = useState([]);
  const [historyLeave11, setHistoryLeave11] = useState([]);
  const [historyLeave12, setHistoryLeave12] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const allYear =
    employeeList.length * 12 -
    historyLeave1.length -
    historyRollcall1.length +
    (historyLeave2.length - historyRollcall2.length) +
    (historyLeave3.length - historyRollcall3.length) +
    (historyLeave4.length - historyRollcall4.length) +
    (historyLeave5.length - historyRollcall5.length) +
    (historyLeave6.length - historyRollcall6.length) +
    (historyLeave7.length - historyRollcall7.length) +
    (historyLeave8.length - historyRollcall8.length) +
    (historyLeave9.length - historyRollcall9.length) +
    (historyLeave10.length - historyRollcall10.length) +
    (historyLeave11.length - historyRollcall11.length) +
    (historyLeave12.length - historyRollcall12.length);
  const out = Math.ceil(allYear / 12);

  const [page, setPage] = useState(1);
  const recordsPerPage = 5;
  const beforePage = 1
  const lastIndex = page * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = allEmployeeList.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allEmployeeList.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (page !== beforePage) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page !== npage) {
      setPage(page + 1);
    }
  }

  const dataPie = [
    { name: "พนักงานที่เข้างาน", value: rollcallYear.length, fill: "#329632" },
    {
      name: "พนักงานที่ขาดงาน",
      value: rollcallYear.length >= 1 ? out : 0,
      fill: "#c83232",
    },
    { name: "พนักงานที่ลางาน", value: leaveYear.length, fill: "#fcad03" },
  ];

  const dataBar = [
    {
      name: "มกราคม",
      เข้างาน: historyRollcall1.length,
      ขาดงาน:
        historyRollcall1.length >= 1
          ? employeeList.length - historyLeave1.length - historyRollcall1.length
          : 0,
      ลางาน: historyLeave1.length,
    },
    {
      name: "กุมภาพันธ์",
      เข้างาน: historyRollcall2.length,
      ขาดงาน:
        historyRollcall2.length >= 1
          ? employeeList.length - historyLeave2.length - historyRollcall2.length
          : 0,
      ลางาน: historyLeave2.length,
    },
    {
      name: "มีนาคม",
      เข้างาน: historyRollcall3.length,
      ขาดงาน:
        historyRollcall3.length >= 1
          ? employeeList.length - historyLeave3.length - historyRollcall3.length
          : 0,
      ลางาน: historyLeave3.length,
    },
    {
      name: "เมษายน",
      เข้างาน: historyRollcall4.length,
      ขาดงาน:
        historyRollcall4.length >= 1
          ? employeeList.length - historyLeave4.length - historyRollcall4.length
          : 0,
      ลางาน: historyLeave4.length,
    },
    {
      name: "พฤษภาคม",
      เข้างาน: historyRollcall5.length,
      ขาดงาน:
        historyRollcall5.length >= 1
          ? employeeList.length - historyLeave5.length - historyRollcall5.length
          : 0,
      ลางาน: historyLeave5.length,
    },
    {
      name: "มิถุนายน",
      เข้างาน: historyRollcall6.length,
      ขาดงาน:
        historyRollcall6.length >= 1
          ? employeeList.length - historyLeave6.length - historyRollcall6.length
          : 0,
      ลางาน: historyLeave6.length,
    },
    {
      name: "กรกฎาคม",
      เข้างาน: historyRollcall7.length,
      ขาดงาน:
        historyRollcall7.length >= 1
          ? employeeList.length - historyLeave7.length - historyRollcall7.length
          : 0,
      ลางาน: historyLeave7.length,
    },
    {
      name: "สิงหาคม",
      เข้างาน: historyRollcall8.length,
      ขาดงาน:
        historyRollcall8.length >= 1
          ? employeeList.length - historyLeave8.length - historyRollcall8.length
          : 0,
      ลางาน: historyLeave8.length,
    },
    {
      name: "กันยายน",
      เข้างาน: historyRollcall9.length,
      ขาดงาน:
        historyRollcall9.length >= 1
          ? employeeList.length - historyLeave9.length - historyRollcall9.length
          : 0,
      ลางาน: historyLeave9.length,
    },
    {
      name: "ตุลาคม",
      เข้างาน: historyRollcall10.length,
      ขาดงาน:
        historyRollcall10.length >= 1
          ? employeeList.length -
            historyLeave10.length -
            historyRollcall10.length
          : 0,
      ลางาน: historyLeave10.length,
    },
    {
      name: "พฤศจิกายน",
      เข้างาน: historyRollcall11.length,
      ขาดงาน:
        historyRollcall11.length >= 1
          ? employeeList.length -
            historyLeave11.length -
            historyRollcall11.length
          : 0,
      ลางาน: historyLeave11.length,
    },
    {
      name: "ธันวาคม",
      เข้างาน: historyRollcall12.length,
      ขาดงาน:
        historyRollcall12.length >= 1
          ? employeeList.length -
            historyLeave12.length -
            historyRollcall12.length
          : 0,
      ลางาน: historyLeave12.length,
    },
  ];

  async function getUsers() {
    await fetch("https://project-test-1.herokuapp.com/users/notadmin/active")
      .then((data) => data.json())
      .then((result) => {
        setEmployeeList(result);
      });
  }

  async function getRollcall_In() {
    await fetch("https://project-test-1.herokuapp.com/rollcall/in")
      .then((data) => data.json())
      .then((result) => {
        setRollcallIn(result);
      });
  }

  async function getLeave() {
    await fetch("https://project-test-1.herokuapp.com/leave1")
      .then((data) => data.json())
      .then((result) => {
        setLeave1(result);
      });
  }

  async function getHistoryRollcallAll() {
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/1")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall1(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/2")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall2(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/3")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall3(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/4")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall4(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/5")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall5(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/6")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall6(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/7")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall7(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/8")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall8(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/9")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall9(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/10")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall10(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/11")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall11(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/12")
      .then((data) => data.json())
      .then((result) => {
        setHistoryRollcall12(result);
      });
  }

  async function getHistoryLeaveAll() {
    await fetch("https://project-test-1.herokuapp.com/history/leaves/1")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave1(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/2")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave2(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/3")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave3(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/4")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave4(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/5")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave5(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/6")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave6(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/7")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave7(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/8")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave8(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/9")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave9(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/10")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave10(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/11")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave11(result);
      });
    await fetch("https://project-test-1.herokuapp.com/history/leaves/12")
      .then((data) => data.json())
      .then((result) => {
        setHistoryLeave12(result);
      });
  }

  async function getRollcallYear() {
    await fetch("https://project-test-1.herokuapp.com/history/rollcall/year")
      .then((data) => data.json())
      .then((result) => {
        setRollcallYear(result);
      });
  }

  async function getleaveYear() {
    await fetch("https://project-test-1.herokuapp.com/history/leave/year")
      .then((data) => data.json())
      .then((result) => {
        setLeaveYear(result);
      });
  }

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

  async function getAllUsers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/users", requestOptions)
      .then((response) => response.json())
      .then((result) => setAllEmployeeList(result))
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
    getUsers();
    getRollcall_In();
    getLeave();
    getHistoryRollcallAll();
    getHistoryLeaveAll();
    getRollcallYear();
    getleaveYear();
    getTeam();
    getAllUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="row mx-5 form-container">
        <div className="row">
          {/* จำนวนพนักงานที่เข้างาน */}
          <div className="col-sm-4">
            <div className="card1 shadow-lg p-3 mb-5 rounded">
              <div className="card-body">
                <Link to="/admin/employee" className="iconselect">
                  <img
                    src="https://cosmotech.com.ph/wp-content/uploads/2021/11/Employee-self.png"
                    alt=""
                    width="250"
                    height="145"
                  />
                </Link>
                <div className="card-title front1">จำนวนพนักงานที่เข้างาน</div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <div className="card-title front2">
                    {rollcallIn.length} / {employeeList.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* จำนวนพนักงานที่ขาดงาน */}
          <div className="col-sm-4">
            <div className="card2 shadow-lg p-3 mb-5 rounded">
              <div className="card-body">
                <div className="card-title front1">จำนวนพนักงานที่ขาดงาน</div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <div className="card-title front2">
                    {employeeList.length - rollcallIn.length - leave1.length} /{" "}
                    {employeeList.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* จำนวนพนักงานที่ลางาน */}
          <div className="col-sm-4">
            <div className="card3 shadow-lg p-3 mb-5 rounded">
              <div className="card-body">
                <div className="card-title front1">จำนวนพนักงานที่ลางาน</div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <div className="card-title front2">
                    {leave1.length} / {employeeList.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BarChart */}
          <div className="col-sm-8 ">
            <div className="card4 shadow-lg p-3 mb-5 rounded">
              <div className="front4">ข้อมูลพนักงานรายเดือน</div>
              <br />
              <div className="card-body d-grid gap-2 d-md-flex">
                <BarChart
                  className="pie1"
                  width={1200}
                  height={300}
                  data={dataBar}
                  margin={{
                    top: 0,
                    right: 70,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis unit="คน" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="เข้างาน" fill="#329632" />
                  <Bar dataKey="ขาดงาน" fill="#c83232" />
                  <Bar dataKey="ลางาน" fill="#fcad03" />
                </BarChart>
              </div>
            </div>
          </div>
          {/* PieChart */}
          <div className="col-sm-4">
            <div className="card4 shadow-lg p-3 mb-5 rounded">
              <div className="front4">ข้อมูลพนักงานรายปี</div>
              <div className="card-body">
                <PieChart width={600} height={336}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={dataPie}
                    cx={250}
                    cy={150}
                    innerRadius={70}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  />
                </PieChart>
              </div>
            </div>
            <br />
          </div>
          <div className="col-sm-6">
            <div className="card card5 shadow-lg p-3 mb-5">
              <div className="card-title front4">
                การผ่านการอบรมของทีมการทำงาน
              </div>
              <div className="card-body">
                <table className="table" key="table">
                  <thead>
                    <tr>
                      <th scope="col">ทีมที่</th>
                      <th scope="col">ชื่อทีม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamList.map((team) => {
                      return (
                        <tr key={team.teamID}>
                          <th scope="row">{team.teamID}</th>
                          <td>{team.teamname}</td>
                          <td>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                              <Link to={"/admin/cer/info/team/" + team.teamID} className="btn btn-success">
                                ดูข้อมูล
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card card5 shadow-lg p-3 mb-5">
              <div className="card-title front4">การผ่านการอบรมของพนักงาน</div>
              <div className="card-body">
                <table className="table" key="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">ชื่อพนักงาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((val) => {
                      if (val.isadmin !== 1) {
                        return (
                          <tr key={val.employeeId}>
                            <th scope="row">{val.employeeId - 1}</th>
                            <td>{val.employeeName}</td>
                            <td>
                              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to={"/admin/cer/info/" + val.employeeId} className="btn btn-success">
                                  ดูข้อมูล
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination justify-content-end">
                    <li className="page-item">
                      <button className="page-link" onClick={prePage}>
                        &laquo;
                      </button>
                    </li>
                    {numbers.map((n, i) => (
                      <li
                        className={`page-item ${page === n ? "active" : ""}`}
                        key={i}
                      >
                        <button className="page-link" onClick={() => setPage(n)}>
                          {n}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button className="page-link" onClick={nextPage}>
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div>
            <br />
          </div>
          {/* <div className="card-body">
            <div className="card-title front4">การผ่านการอบรมของพนักงาน</div>
            <div className="card5 shadow-lg p-3 mb-5 rounded">
              <div className="card-title front3">รายชื่อพนักงาน</div>
              <div className="d-grid gap-2 d-md-flex">
                <div className="card-title front2">
                  {employeeList.map((val) => {
                    return (
                      <div key={val.employeeId}>
                        <ul className="item-lish">
                          <li>
                            <b>{val.username}</b>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <ComposedChart
                  layout="vertical"
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="work" barSize={20} fill="#413ea0" />
                  <Bar dataKey="miss" barSize={20} fill="#413ea0" />
                  <Bar dataKey="late" barSize={20} fill="#413ea0" />
                </ComposedChart>
                <PieChart width={300} height={300}>
                  <Pie
                    data={data01}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

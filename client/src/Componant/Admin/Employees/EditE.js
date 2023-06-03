import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

const EditE = () => {
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
    thailand();
  }, []);

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  console.log("🚀 ~ file: EditE.js:40 ~ EditE ~ data2:", data2)
  const [data3, setData3] = useState([]);

  async function thailand() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }

  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disdrict, setDisdrict] = useState("");
  const [amphur, setAmphur] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [active, setActive] = useState("");

  const [error, setError] = useState(null);
  const handleChnage = (val) => {
    if (val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    await fetch(`https://project-test-1.herokuapp.com/users/${id}`).then(
      (result) => {
        result.json().then((resp) => {
          // console.warn(resp)
          // setData(resp);
          setEmployeeName(resp[0].employeeName);
          setPhoneNo(resp[0].phoneNo);
          setJobPosition(resp[0].jobPosition);
          setPosition(resp[0].position);
          setEmail(resp[0].email);
          setAddress(resp[0].address);
          setDisdrict(resp[0].disdrict);
          setAmphur(resp[0].amphur);
          setProvince(resp[0].province);
          setZipCode(resp[0].zipCode);
          setActive(resp[0].active);
        });
      }
    );
  }

  const updateEmployee = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      jobPosition: jobPosition,
      position: position,
      employeeName: employeeName,
      phoneNo: phoneNo,
      email: email,
      address: address,
      disdrict: disdrict,
      amphur: amphur,
      province: province,
      zipCode: zipCode,
      active: active,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    if (
      jobPosition === "" ||
      position === "" ||
      employeeName === "" ||
      phoneNo === "" ||
      email === "" ||
      address === "" ||
      disdrict === "" ||
      amphur === "" ||
      province === "" ||
      zipCode === ""
    ) {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มข้อมูลได้",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else if (phoneNo.length < 10) {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มหนักงานได้",
        text: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ",
      });
    } else if (error === true) {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มหนักงานได้",
        text: "กรุณากรอกอีเมลให้ถูกต้อง",
      });
    } else {
      fetch(
        `https://project-test-1.herokuapp.com/update/users/${id}`,
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
      navigate("/admin/employee");
    }
  };
  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3 shadow-lg p-3 mb-5 bg-white">
          <div>
            <h2>แก้ไขพนักงาน</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="employeeName">
              ชื่อ - นามสกุล
            </label>
            <input
              type="text"
              className="form-control"
              value={employeeName}
              onChange={(event) => {
                setEmployeeName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="phoneNo">
              เบอร์โทร
            </label>
            <input
              type="text"
              className="form-control"
              maxLength={10}
              value={phoneNo}
              onChange={(event) => {
                setPhoneNo(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่งงาน</label>
            <select
              className="form-select"
              value={jobPosition}
              htmlFor="jobPosition"
              onChange={(event) => {
                setJobPosition(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option>HR</option>
              <option>Recruiter </option>
              <option>IT (Business Analyst)</option>
              <option>IT (Project Manager)</option>
              <option>IT (Software Engineer)</option>
              <option>IT (System Analyst)</option>
              <option>ฝ่ายบัญชี</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่ง</label>
            <select
              className="form-select"
              htmlFor="position"
              value={position}
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option>หัวหน้าพนักงาน</option>
              <option>พนักงาน</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="email">
              อีเมล
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                handleChnage(e.target.value);
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="address">
              ที่อยู่
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">จังหวัด</label>
            <select
              className="form-select"
              value={province}
              htmlFor="province"
              required
              onChange={(event) => {
                if (province) {
                  data.map((val) => {
                    if (event.target.value === val.name_th) {
                      setData2(val.amphure);
                    }
                  });
                }
                setProvince(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือกจังหวัด</option>
              {data.map((val) => {
                // console.log(val.amphure[1].tambon[1].name_th);
                return <option key={val.id}>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">อำเภอ/เขต</label>
            <select
              className="form-select"
              value={amphur}
              htmlFor="amphur"
              required
              onChange={(event) => {
                data2.map((val) => {
                  if (event.target.value === val.name_th) {
                    setData3(val.tambon);
                  }
                });
                setAmphur(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือกอำเภอ/เขต</option>
              {data2.map((val) => {
                return <option key={val.id}>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">ตำบล/แขวง</label>
            <select
              className="form-select"
              value={disdrict}
              htmlFor="districts"
              required
              onChange={(event) => {
                data3.map((val) => {
                  if (event.target.value === val.name_th) {
                    setZipCode(val.zip_code);
                  }
                });
                setDisdrict(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือกตำบล/แขวง</option>
              {data3.map((val) => {
                return <option key={val.id}>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">รหัสไปรษณีย์</label>
            <input
              type="text"
              className="form-control"
              value={zipCode}
              disabled
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">สิทธิการใช้งาน</label>
            <select
              className="form-select"
              htmlFor="gender"
              value={active}
              onChange={(event) => {
                setActive(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option value={1}>เปิดใช้งาน</option>
              <option value={0}>ปิดใช้งาน</option>
            </select>
          </div>
          <button onClick={updateEmployee} className="btn btn-success">
            บันทึกข้อมูลพนักงาน
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditE;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Swal from "sweetalert2";

const EditE = () => {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => setData(result))
    .catch((error) => console.log("error", error));

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

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch(`http://localhost:3333/users/${id}`).then((result) => {
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
      });
    });
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
      address === ""
    ) {
      console.log("Enter all information");
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถเพิ่มข้อมูลได้",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    } else if (
      jobPosition !== "" ||
      position !== "" ||
      employeeName !== "" ||
      phoneNo !== "" ||
      email !== "" ||
      address !== ""
    ) {
      fetch(`http://localhost:3333/update/users/${id}`, requestOptions).then(
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
      <div className="form-container1">
        <form className="form-signin row g-3">
          <div>
            <h2>แก้ไขพนักงาน</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="employeeName">
              ชื่อ - นามสกุล:
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
              เบอร์โทร:
            </label>
            <input
              type="text"
              className="form-control"
              value={phoneNo}
              onChange={(event) => {
                setPhoneNo(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่งงาน:</label>
            <select
              className="form-select"
              value={jobPosition}
              htmlFor="jobPosition"
              onChange={(event) => {
                setJobPosition(event.target.value);
              }}
            >
              <option hidden >กรุณาเลือก</option>
              <option>Devepoler</option>
              <option>System Analysis</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่ง:</label>
            <select
              className="form-select"
              htmlFor="position"
              value={position}
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            >
              <option hidden >กรุณาเลือก</option>
              <option>หัวหน้าพนักงาน</option>
              <option>พนักงาน</option>
            </select>
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="email">
              อีเมล:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label" htmlFor="address">
              ที่อยู่:
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
            <label className="form-label">จังหวัด:</label>
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
              <option hidden >กรุณาเลือกจังหวัด</option>
              {data.map((val) => {
                // console.log(val.amphure[1].tambon[1].name_th);
                return <option>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">อำเภอ/เขต:</label>
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
                return <option>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">ตำบล/แขวง:</label>
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
                return <option>{val.name_th}</option>;
              })}
            </select>
          </div>
          <div className="col-md-1">
            <label className="form-label">รหัสไปรษณีย์:</label>
            <input
              type="text"
              className="form-control"
              value={zipCode}
              disabled
              required
            />
          </div>
          <button onClick={updateEmployee} className="btn btn-success">
            Update Employee
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            Back
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditE;

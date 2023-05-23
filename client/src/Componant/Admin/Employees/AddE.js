import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

export default function AddE() {

  useEffect(() => {
    const token = localStorage.getItem("Admin");
    fetch("https://long-teal-cormorant-garb.cyclic.app/authen", {
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
      thailand()
  }, []);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  
  async function thailand() {
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
  }

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [identityNo, setIdentityNo] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [position, setPosition] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disdrict, setDisdrict] = useState("");
  const [amphur, setAmphur] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  // const [pic, setPic] = useState("");s

  // const handleFile = (e) => {
  //   setPic(e.target.files[0]);
  // };

  const addEmployee = (event) => {
    event.preventDefault();

    // Swal.fire({
    //   icon: "error",
    //   title: "ไม่สามารถเพิ่มข้อมูลได้",
    //   text: "กรุณากรอกข้อมูลให้ครบ",
    // });

    try {
      // const formdata = new FormData();
      // formdata.append("image", pic);
      const jsonData = {
        username: username,
        password: password,
        identityNo: identityNo,
        employeeName: employeeName,
        gender: gender,
        birthday: birthday,
        jobPosition: jobPosition,
        position: position,
        phoneNo: phoneNo,
        email: email,
        address: address,
        province: province,
        amphur: amphur,
        disdrict: disdrict,
        zipCode: zipCode,
        // certificateName: certificateName,
        // certificatePic: certificatePic,
      };
      fetch("https://long-teal-cormorant-garb.cyclic.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "เพิ่มข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 2500,
            }).then(navigate("/admin/employee"));
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <br />
      <div className="form-container">
        <form className="form-signin row g-3" enctype="multipart/form-data">
          <div>
            <h2>เพิ่มพนักงาน</h2>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="username">
              รหัสผู้ใช้งาน:
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="password">
              รหัสผ่าน:
            </label>
            <input
              type="password"
              className="form-control"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="identityNo">
              รหัสบัตรประชาชน:
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setIdentityNo(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่งงาน:</label>
            <select
              className="form-select"
              htmlFor="jobPosition"
              required
              onChange={(event) => {
                setJobPosition(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option>Devepoler</option>
              <option>System Analysis</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">ตำแหน่ง:</label>
            <select
              className="form-select"
              htmlFor="position"
              required
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option>หัวหน้าพนักงาน</option>
              <option>พนักงาน</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="employeeName">
              ชื่อ - นามสกุล:
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setEmployeeName(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label htmlfor="" class="form-label">
              วันเกิด
            </label>
            <input
              className="form-control"
              id="date"
              label="Birthday"
              type="date"
              defaultValue="today"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setBirthday(event.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">เพศ</label>
            <select
              className="form-select"
              htmlFor="gender"
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือก</option>
              <option value={1}>ชาย</option>
              <option value={0}>หญิง</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="phoneNo">
              เบอร์โทร:
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setPhoneNo(event.target.value);
              }}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label" htmlFor="email">
              อีเมล:
            </label>
            <input
              type="email"
              className="form-control"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="address">
              ที่อยู่:
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">จังหวัด:</label>
            <select
              className="form-select"
              htmlFor="province"
              required
              onChange={(event) => {
                data.map((val) => {
                  if (event.target.value === val.name_th) {
                    setData2(val.amphure);
                  }
                });
                setProvince(event.target.value);
              }}
            >
              <option hidden>กรุณาเลือกจังหวัด</option>
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
          <div className="col-md-2">
            <label className="form-label">รหัสไปรษณีย์:</label>
            <input
              type="text"
              className="form-control"
              value={zipCode}
              disabled
              required
            />
          </div>
          {/* <div className="col-md-12">
            <label className="form-label" htmlFor="pic">
              อัพโหลดรูปภาพ:
            </label>
            <input
              type="file"
              className="form-control"
              htmlFor="pic"
              requires
              onChange={handleFile}
            />
          </div> */}
          <button onClick={addEmployee} class="btn btn-success">
            เพิ่มข้อมูลพนักงาน
          </button>
          <Link to="/admin/employee" className="btn btn-primary">
            ย้อนกลับ
          </Link>
        </form>
      </div>
    </>
  );
}

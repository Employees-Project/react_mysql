import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import "./Teams.css"
const Team = () => {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  console.log("🚀 ~ file: Team.js:8 ~ Team ~ teamList:", teamList);

  const deleteTeam = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3000/team/delete/${id}`, requestOptions).then(
      getTeam()
    );
  };

  async function getTeam() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("http://localhost:3000/teams", requestOptions)
      .then((response) => response.json())
      .then((result) => setTeamList(result))
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    const token = localStorage.getItem("Admin");
    fetch("http://localhost:3000/authen", {
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
    getTeam();
  }, []);

  return (
    <>
      <AdminNavbar />
      
        <div className="container d-flex flex-row-reverse bd-highlight">
          <Link to="/admin/addteam" className="btn btn-primary form-container">
            เพิ่มทีม
          </Link>
        </div>
        <br />
        <div className="container">
        {teamList.map((val) => (
          <div className="form-container">
            <div className="col-sm">
              <div className="card">
                <h3 class="card-header">ทีม {val.teamname}</h3>
                <div className="card-body">
                  <h4 className="card-title">
                    <b>หัวหน้าทีม</b>
                  </h4>
                  <h4 className="card-text">{val.leadername}</h4>
                  <br/>
                  <h4 className="card-title">
                    <b>สมาชิกในทีม</b>
                  </h4>
                  <h4 className="card-text">1. {val.member1}</h4>
                  <h4 className="card-text">2. {val.member2}</h4>
                  <h4 className="card-text">
                    {val.member3 ? `3. ${val.member3}` : null}
                  </h4>
                  <h4 className="card-text">
                    {val.member4 ? `4. ${val.member3}` : null}
                  </h4>
                  <h4 className="card-text">
                    {val.member5 ? `5. ${val.member3}` : null}
                  </h4>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "คุณต้องการลบทีมใช่หรือไม่?",
                          // text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "ใช่! ฉันต้องการลบ",
                          cancelButtonText: "ยกเลิก",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteTeam(val.teamID);
                            getTeam();
                            Swal.fire(
                              "ลบสำเร็จ!",
                              "คุณได้ลบทีมสำเร็จ",
                              "success"
                            );
                          }
                        })
                      }
                      class="btn btn-danger"
                    >
                      ลบทีม
                    </button>
                    <Link
                      to={"/admin/team/edit/" + val.teamID}
                      class="btn btn-warning "
                    >
                      แก้ไขทีม
                    </Link>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;

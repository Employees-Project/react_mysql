import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import "./Teams.css"
const Team = () => {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const [data, setData] = useState([]);

  const deleteTeam = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://project-test-1.herokuapp.com/team/delete/${id}`,
      requestOptions
    ).then(getTeam());
  };

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

  async function getUsers() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch("https://project-test-1.herokuapp.com/users", requestOptions)
    .then((response) => response.json())
    .then((result) => setData(result))
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
    getTeam();
    getUsers();
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
          <div className="form-container" key={val.teamID}>
            <div className="col-sm">
              <div className="card shadow-lg p-3 mb-5 bg-white">
                <h3 className="card-header">ทีม {val.teamname}</h3>
                <div className="card-body">
                  <h4 className="card-title">
                    <b>หัวหน้าทีม</b>
                  </h4>
                  {data.map((leader) => {
                    return (<h4 className="card-text" key={leader.employeeid}>{val.leadername === leader.employeeid ? leader.employeeName : null }</h4>)
                  })}
                  <br />
                  <h4 className="card-title">
                    <b>สมาชิกในทีม</b>
                  </h4>
                  {data.map((member1) => {
                    return ( <h4 className="card-text" key={member1.employeeid}>{val.member1 === member1.employeeid ? `1. ${member1.employeeName}` : null}</h4> )
                  })}
                  {data.map((member2) => {
                    return ( <h4 className="card-text" key={member2.employeeid}>{val.member2 === member2.employeeid ? `2. ${member2.employeeName}` : null}</h4> )
                  })}
                  {data.map((member3) => {
                    return ( <h4 className="card-text" key={member3.employeeid}>{val.member3 === member3.employeeid ? `3. ${member3.employeeName}` : null}</h4> )
                  })}
                  {data.map((member4) => {
                    return ( <h4 className="card-text" key={member4.employeeid}>{val.member4 === member4.employeeid ? `4. ${member4.employeeName}` : null}</h4> )
                  })}
                  {data.map((member5) => {
                    return ( <h4 className="card-text" key={member5.employeeid}>{val.member5 === member5.employeeid ? `5. ${member5.employeeName}` : null}</h4> )
                  })}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
                      className="btn btn-danger"
                    >
                      ลบทีม
                    </button>
                    <Link
                      to={"/admin/team/edit/" + val.teamID}
                      className="btn btn-warning "
                    >
                      แก้ไขทีม
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Team;

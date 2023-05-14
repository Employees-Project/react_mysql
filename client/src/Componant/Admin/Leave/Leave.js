import React, { useState } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Leave = () => {
  const [leave, setLeave] = useState([]);
  const [deleteL, setDeleteL] = useState([]);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://localhost:3333/leave", requestOptions)
    .then((response) => response.json())
    .then((result) => setLeave(result))
    .catch((error) => console.log("error", error));

  const deleteLeave = (id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3333/leave/delete/${id}`, requestOptions)
      .then((response) => setDeleteL(response.data))
  };
  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex flex-row-reverse bd-highlight">
          <Link to="/admin/addleave" className="btn btn-primary">
            เพิ่มหัวข้อการลา
          </Link>
        </div>
        <hr />
        <div className="row">
          {leave.map((val) => {
            return (
              <div className="col-md-4">
                <div className="card">
                  <h3 class="card-header">{val.l_subject}</h3>
                  <div className="card-body">
                    <h4 className="card-title">
                      <b>เกณฑ์การลารายเดือน</b>
                    </h4>
                    <p className="card-text">{val.l_limit_m}</p>
                    <h4 className="card-title">
                      <b>เกณฑ์การลารายปี</b>
                    </h4>
                    <p className="card-text">{val.l_limit_y}</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        onClick={() => Swal.fire({
                            title: 'คุณต้องการลบทีมใช่หรือไม่?',
                            // text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'ใช่! ฉันต้องการลบ',
                            cancelButtonText: 'ยกเลิก'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                deleteLeave(val.historyId)
                              Swal.fire(
                                'ลบสำเร็จ!',
                                'คุณได้ลบทีมสำเร็จ',
                                'success'
                              )
                            }
                          })}
                        class="btn btn-danger"
                      >
                        ลบ
                      </button>
                      <Link
                        to={"/admin/leave/edit/" + val.historyId}
                        class="btn btn-warning "
                      >
                        แก้ไขเกณฑ์การลา
                      </Link>
                    </div>
                  </div>
                </div>
                <br/>
              </div>
            );
          })}
        </div>
        <div />
      </div>
    </>
  );
};

export default Leave;

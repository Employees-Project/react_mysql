import React from "react";
import { Link, useNavigate} from "react-router-dom";
import './AdminNavbar.css'
import Swal from "sweetalert2";
import { NavLink } from 'react-router-dom';
const AdminNavbar = () => {
    const navigate = useNavigate();
    const Logout = () => {
        window.localStorage.removeItem("Admin");
        Swal.fire({
            position: "center",
            icon: "success",
            title: "ออกจากระบบสำเร็จ",
            showConfirmButton: false,
            timer: 2500,
          });
        navigate("/");
    }

    

    return (
        <div className="background">
            <div className="container p-3 mb-3" >
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <Link to="/admin/"><img src="https://www.jobbkk.com/upload/employer/0A/19A/03119A/images/2022-05-249811.png" alt="" width="250" height="62"/></Link>          
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navbar">
                        <li><NavLink to="/admin/" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>ข้อมูลโดยรวม</NavLink></li>
                        <li><NavLink to="/admin/employee" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>ข้อมูลพนักงาน</NavLink></li>
                        <li><NavLink to="/admin/calendar" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>ปฏิทิน</NavLink></li>
                        <li><NavLink to="/admin/team" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>จัดการทีม</NavLink></li>
                        <li><NavLink to="/admin/leave" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>ข้อมูลการลา</NavLink></li>
                        <li><NavLink to="/admin/noti" className={({isActive}) => (isActive ? "active nav-link px-2 text-white" : 'nav-link px-2 text-white')}>การแจ้งเตือน</NavLink></li>
                    </ul>
                    <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 navbar">
                        <Link to="/admin/employee/info/admin/1" style={{ textDecoration: 'none' }} className="text-light">ผู้ดูแลระบบ</Link>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary navbar buttonlogout" data-bs-toggle="dropdown" aria-expanded="false" onClick={Logout}>
                        ออกจากระบบ
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default AdminNavbar
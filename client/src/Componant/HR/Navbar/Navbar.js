import React from "react";
import { Link, useNavigate} from "react-router-dom";
import './Navbar.css'
import Swal from "sweetalert2";

const Navbar = () => {
    const navigate = useNavigate();
    const Logout = () => {
        window.localStorage.removeItem("HR");
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
            <div className="container p-3 mb-3 border-bottom" >
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/home" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        <img src="https://www.jobbkk.com/upload/employer/0A/19A/03119A/images/2022-05-249811.png" alt="" width="200" height="50"/>
                    </Link>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/home" className="nav-link px-2 text-white">ข้อมูลโดยรวม</Link></li>
                        <li><Link to="/employee" className="nav-link px-2 text-white">ข้อมูลพนักงาน</Link></li>
                        <li><Link to="/calendar" className="nav-link px-2 text-white">ปฏิทิน</Link></li>
                        <li><Link to="/" className="nav-link px-2 text-white">จัดการทีม</Link></li>
                        <li><Link to="/" className="nav-link px-2 text-white">ข้อมูลการลา</Link></li>
                        <li><Link to="/noti" className="nav-link px-2 text-white">การแจ้งเตือน</Link></li>
                    </ul>
                    {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" class="form-control" placeholder="Search" aria-label="Search"/>
                    </form> */}
                    <div>
                        <button type="button" className="btn btn-primary " data-bs-toggle="dropdown" aria-expanded="false" onClick={Logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Navbar
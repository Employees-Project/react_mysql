import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Componant/Admin/Dashboard/Admin";
import Dashboard from "./Componant/HR/Dashboard/Dashboard";
import SignIn from "./Componant/Login";
import Register from "./Componant/Register";
import Employees from "./Componant/Admin/Employees/Employees";
import EditE from "./Componant/Admin/Employees/EditE";
import Info from "./Componant/Admin/Employees/Info";
import AddE from "./Componant/Admin/Employees/AddE";
import Noti from "./Componant/Admin/Noti/Noti";
import Leave from "./Componant/Admin/Leave/Leave";
import AddL from "./Componant/Admin/Leave/AddL";
import EditL from "./Componant/Admin/Leave/EditL";
import UploadPic from "./Componant/Admin/Employees/UploadPic";
import Calendar from "./Componant/Admin/Calendar/Calendar";
import AddEvent from "./Componant/Admin/Calendar/AddEvent";
import Team from "./Componant/Admin/Team/Team";
import EditT from "./Componant/Admin/Team/EditT";
import AddT from "./Componant/Admin/Team/AddT";
import ReadN from "./Componant/Admin/Noti/ReadN";
import HREmployees from "./Componant/HR/Employees/HREmployees";
import HRAddE from "./Componant/HR/Employees/HRAddE";
import HREditE from "./Componant/HR/Employees/HREditE";
import HRInfo from "./Componant/HR/Employees/HRInfo";
import HRUploadPic from "./Componant/HR/Employees/HRUploadPic";
import InfoAdmin from "./Componant/Admin/Employees/InfoAdmin";
import EditAdmin from "./Componant/Admin/Employees/EditAdmin";
import EditPassword from "./Componant/Admin/Employees/EditPassword";
import InfoC from "./Componant/Admin/Noti/InfoC";

function App() {
  const LoggedInAdmin = localStorage.getItem("Admin");
  const LoggedIn = localStorage.getItem("HR");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={LoggedIn ? <Dashboard /> : <SignIn />} />
          <Route index element={LoggedInAdmin ? <Admin /> : <SignIn />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="employee" element={<HREmployees />} />
          <Route path="addemployee" element={<HRAddE />} />
          <Route path="employee/edit/:id" element={<HREditE />} />
          <Route path="employee/info/:id" element={<HRInfo />} />
          <Route path="employee/uploadpic/:id" element={<HRUploadPic />} />
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path="employee" element={<Employees />} />
            <Route path="addemployee" element={<AddE />} />
            <Route path="employee/edit/:id" element={<EditE />} />
            <Route path="employee/edit/admin/:id" element={<EditAdmin />} />
            <Route path="employee/edit/password/:id" element={<EditPassword />} />
            <Route path="employee/info/:id" element={<Info />} />
            <Route path="employee/info/admin/:id" element={<InfoAdmin />} />
            <Route path="employee/uploadpic/:id" element={<UploadPic />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="addevent" element={<AddEvent />} />
            <Route path="team" element={<Team />} />
            <Route path="addteam" element={<AddT />} />
            <Route path="team/edit/:id" element={<EditT />} />
            <Route path="leave" element={<Leave />} />
            <Route path="addleave" element={<AddL />} />
            <Route path="leave/edit/:id" element={<EditL />} />
            edit/team/undefined
            <Route path="noti" element={<Noti />} />
            <Route path="noti/info/leave/:id" element={<ReadN />} />
            <Route path="noti/info/certificate/:id" element={<InfoC />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

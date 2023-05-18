import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "Admin") {
          Swal.fire({
            icon: "success",
            title: "ลงชื่อเข้าใช้งานสำเร็จ",
            text: "สวัสดี Admin",
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.setItem("Admin", data.token);
          navigate("/admin/");
        } else if (data.status === "HR") {
          Swal.fire({
            icon: "success",
            title: "ลงชื่อเข้าใช้งานสำเร็จ",
            text: "สวัสดี HR",
            showConfirmButton: false,
            timer: 2000,
          });
          localStorage.setItem("HR", data.token);
          navigate("/home");
        } else if (data.status === "Not Active") {
          Swal.fire({
            icon: "error",
            title: "รหัสผู้ใช้งานถูกระงับการใช้งาน",
            text: "โปรดติดต่อ Admin",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title : `รหัสผู้ใช้งานหรือรหัสผ่าน
            ไม่ถูกต้อง`,
            text: "โปรดกรอกข้อมูลใหม่อีกครั้ง!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="log-form">
      <h1>
        ระบบจัดเก็บข้อมูลพนักงาน<br/>บริษัท โปรทอส เทคโนโลยีจำกัด</h1>
          <br />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="" variant="h5">
              <h2>ลงชื่อเข้าใช้งาน</h2>
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="รหัสผู้ใช้งาน"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              ><h3>ลงชื่อเข้าใช้งาน</h3>
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>

  );
}
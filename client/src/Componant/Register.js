import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
      identityNo: data.get("identityNo"),
      pic: data.get("pic"),
      employeeName: data.get("employeeName"),
      gender: data.get("gender"),
      birthday: data.get("birthday"),
      jobPosition: data.get("jobPosition"),
      position: data.get("position"),
      phoneNo: data.get("phoneNo"),
      email: data.get("email"),
      address: data.get("address"),
      province: data.get("province"),
      amphur: data.get("amphur"),
      disdrict: data.get("disdrict"),
      zipCode: data.get("zipCode"),
      certificateName: data.get("certificateName"),
      certificatePic: data.get("certificatePic"),
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Register Success");
        } else {
          alert("Register Fail");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="identityNo"
                  required
                  fullWidth
                  id="identityNo"
                  label="identityNo"
                  autoComplete="identityNo"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  focused
                  // type='file'
                  // required
                  fullWidth
                  id="pic"
                  name="pic"
                  label="pic"
                  autoComplete="pic"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="employeeName"
                  label="employeeName"
                  name="employeeName"
                  autoComplete="employeeName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="gender"
                  id="gender"
                  autoComplete="gender"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  focused
                  type="date"
                  name="birthday"
                  required
                  fullWidth
                  id="birthday"
                  label="birthday"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="jobPosition"
                  label="jobPosition"
                  name="jobPosition"
                  autoComplete="jobPosition"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="position"
                  label="position"
                  type="position"
                  id="position"
                  autoComplete="position"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="phoneNo"
                  name="phoneNo"
                  required
                  fullWidth
                  id="phoneNo"
                  label="phoneNo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="province"
                  label="province"
                  type="province"
                  id="province"
                  autoComplete="province"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="amphur"
                  label="amphur"
                  name="amphur"
                  autoComplete="amphur"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="disdrict"
                  label="disdrict"
                  type="disdrict"
                  id="disdrict"
                  autoComplete="disdrict"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="zipCode"
                  name="zipCode"
                  required
                  fullWidth
                  id="zipCode"
                  label="zipCode"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="certificateName"
                  label="certificateName"
                  name="certificateName"
                  autoComplete="certificateName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="certificatePic"
                  label="certificatePic"
                  name="certificatePic"
                  autoComplete="certificatePic"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

var express = require("express");
var cors = require("cors");
const multer = require("multer");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "Login";

app.use(cors());

app.use(express.static("public"));

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "34.126.189.126",
  user: "root",
  password: "admin1",
  database: "test",
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-image-${file.originalname}`);
  },
});

var upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), (req, res, next) => {
  const image = req.file.filename;
  connection.query(
    "INSERT INTO employees (pic) VALUE (?)",
    [image],
    (err, result) => {
      if (err) {
        return res.json({ messeage: "Error" });
      } else {
        res.json({ status: "ok" });
      }
    }
  );
});

app.put("/upload/:id", upload.single("image"), (req, res, next) => {
  const id = req.params.id;
  const image = req.file.filename;
  connection.query(
    "UPDATE employees SET pic = ? WHERE employeeid = ?",
    [image, id],
    (err, result) => {
      if (err) {
        return res.json({ messeage: err });
      } else {
        res.json({ status: "ok" });
      }
    }
  );
});

app.get("/events", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM calendar order by CalendarID",
    function (err, events, fields) {
      if (err) throw err;
      res.json(events);
    }
  );
});

app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.query(
      "INSERT INTO employees (username, password, identityNo, employeeName, gender, birthday, jobPosition, position, phoneNo, email, address, province, amphur, disdrict, zipCode, certificateName, certificatePic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.username,
        hash,
        req.body.identityNo,
        req.body.employeeName,
        req.body.gender,
        req.body.birthday,
        req.body.jobPosition,
        req.body.position,
        req.body.phoneNo,
        req.body.email,
        req.body.address,
        req.body.province,
        req.body.amphur,
        req.body.disdrict,
        req.body.zipCode,
        req.body.certificateName,
        req.body.certificatePic,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", messeage: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM employees WHERE username=?",
    [req.body.username],
    function (err, employees, fields) {
      if (err) {
        res.json({ status: "error", messeage: err });
        return;
      }
      if (employees.length == 0) {
        res.json({ status: "error", messeage: "no user" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        employees[0].password,
        function (err, isLogin) {
          if (isLogin) {
            let isActive = employees[0].active;
            let isAdmin = employees[0].isadmin;
            if (isActive === 1 && isAdmin === 1) {
              var token = jwt.sign(
                { username: employees[0].username },
                secret,
                {
                  expiresIn: "1h",
                }
              );
              res.json({ status: "Admin", messeage: "Admin Login", token });
            } else if (isActive === 1 && isAdmin !== 1) {
              var token = jwt.sign(
                { username: employees[0].username },
                secret,
                {
                  expiresIn: "1h",
                }
              );
              res.json({ status: "HR", messeage: "Hr Login", token });
            } else if (isActive !== 1) {
              res.json({ status: "Not Active", messeage: "Not Active", token });
            }
          } else {
            res.json({
              status: "username or password is incorrect",
              messeage: "Login Fail",
            });
          }
        }
      );
    }
  );
});

app.get("/users", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM employees order by employeeid",
    function (err, users, fields) {
      if (err) throw err;
      res.json(users);
    }
  );
});

app.get("/users/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.execute(
    "SELECT * FROM employees WHERE employeeid = ?",
    [id],
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.put("/update/users/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "UPDATE employees SET jobPosition = ?, position = ?, employeeName = ?, phoneNo = ?, email = ?, address = ?, disdrict = ?, amphur = ?, province = ?, zipCode = ? WHERE employeeid = ?",
    [
      req.body.jobPosition,
      req.body.position,
      req.body.employeeName,
      req.body.phoneNo,
      req.body.email,
      req.body.address,
      req.body.disdrict,
      req.body.amphur,
      req.body.province,
      req.body.zipCode,
      id,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: `User modified with ID: ${id}`,
          messeage: "Success",
        });
      }
    }
  );
});

app.get("/leave", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM history ORDER BY historyId ASC",
    function (err, datas, fields) {
      if (err) throw err;
      res.json(datas);
    }
  );
});

app.post("/add/leave", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM history WHERE l_subject = ?",
    [req.body.l_subject],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      if (results.length > 0) {
        res.json({ status: "error", messeage: "Leave already registered" });
      } else {
        connection.execute(
          "INSERT INTO history (l_subject ,l_limit_m ,l_limit_y)VALUES (? ,? ,?)",
          [req.body.l_subject, req.body.l_limit_m, req.body.l_limit_y],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                status: "ok",
                messeage: "Success",
              });
            }
          }
        );
      }
    }
  );
});

app.get("/leave/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.execute(
    "SELECT * FROM history WHERE historyId = ?",
    [id],
    function (err, results, fields) {
      res.json(results);
    }
  );
});

app.put("/update/leave/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "UPDATE history SET l_subject = ?, l_limit_m = ?, l_limit_y = ? WHERE historyId = ?",
    [req.body.l_subject, req.body.l_limit_m, req.body.l_limit_y, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: `Leave modified with ID: ${id}`,
          messeage: "Success",
        });
      }
    }
  );
});

app.delete("/leave/delete/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.execute(
    "DELETE FROM history WHERE historyId = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: `Leave Delete with ID: ${id}`,
          messeage: "Delete Success",
        });
      }
    }
  );
});

app.post("/add/event", jsonParser, (req, res, next) => {
  connection.query(
    "INSERT INTO calendar (subject, date, s_time, e_time, detail, latitude, longitude)VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.subject,
      req.body.date,
      req.body.s_time,
      req.body.e_time,
      req.body.detail,
      req.body.latitude,
      req.body.longitude,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", messeage: "Success" });
      }
    }
  );
});

app.get("/teams", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM teams order by teamID",
    function (err, teams, fields) {
      if (err) throw err;
      res.json(teams);
    }
  );
});

app.get("/team/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.execute(
    "SELECT * FROM teams WHERE teamID = ?",
    [id],
    function (err, team, fields) {
      res.json(team);
    }
  );
});

app.post("/add/team", jsonParser, (req, res, next) => {
  connection.query(
    "SELECT * FROM teams WHERE teamname = ?",
    [req.body.teamName],
    (err, results) => {
      if (results.length > 0) {
        res.json({ status: "error", messeage: "Team Name is already used" });
      } else {
        connection.query("INSERT INTO teams (teamname, leadername, member1, member2, member3, member4, member5, leader )VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          req.body.teamname,
          req.body.leadername,
          req.body.member1,
          req.body.member2,
          req.body.member3,
          req.body.member4,
          req.body.member5,
          req.body.leader,
        ],
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            res.json({ status: "ok", messeage: "Team Added" });
          }
        })
      }
    }
  );
});

app.delete("/team/delete/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.execute(
    "DELETE FROM teams WHERE teamID = ?",
    [id],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: `Team Delete with ID: ${id}`,
          messeage: "Delete Success",
        });
      }
    }
  );
});

app.put("/update/team/:id", jsonParser, function (req, res, next) {
  const id = req.params.id;
  connection.query(
    "UPDATE teams SET teamname = ?, leadername = ?, member1 = ?, member2 = ?, member3 = ?, member4 = ?, member5 = ?, leader = ? WHERE teamid = ?",
    [req.body.teamname, req.body.leadername, req.body.member1,req.body.member2, req.body.member3, req.body.member4, req.body.member5, req.body.leader, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          status: "Success",
          messeage: `Team modified with ID: ${id}`,
        });
      }
    }
  );
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", messeage: err.messeage });
  }
});

app.post("/authen/hr", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", messeage: err.messeage });
  }
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});

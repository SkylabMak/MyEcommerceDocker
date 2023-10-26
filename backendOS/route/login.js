const express = require("express");

const router = express.Router();
const SQLPool = require("../DB/MySQLpool");

router.post("/login", async (req, res) => {
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.log("Error connecting to SQL", err);
  //     return;
  //   }
  //   console.log("connedted to MYSQL");
  // });
  const username = req.body.username;
  const password = req.body.password;
//   console.log(req.body)


  let result = {idUser: "",role:"", success : false}
//   let result;

  SQLPool.query(`SELECT * FROM User WHERE Username = ? AND password = ?`,[username,password], (err, records) => {
    // records.forEach(element => {
    //     console.log(element.ProductName)
    //   });
    if (records.length > 0) {
      console.log("in")
      result.idUser = records[0].idUser;
      result.role = records[0].Role;
      result.success = true;
    } 
    res.json(result)
  });
 
  
//   res.send("<h1>kuy</h1>")
});

// router.post("/register")const express = require("express");


router.post("/register", async (req, res) => {
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.log("Error connecting to SQL", err);
  //     return;
  //   }
  //   console.log("connedted to MYSQL");
  // });
  const username = req.body.username;
  const password = req.body.password;
//   console.log(req.body)


  let result = {idUser: "", success : false}
//   let result;

  SQLPool.query(`SELECT Username FROM User WHERE Username = ?`,[username], (err, records) => {
    if (records.length == 0) {
      SQLPool.query(`INSERT INTO User (Username, password, Role) VALUES (?,?,"buyer");`,[username,password], (err, records) => {
        res.send({
          "success": true
        })
      });

    } else {
      res.send({
        "success": false
      })
    }
  })
 
  
//   res.send("<h1>kuy</h1>")
});

// router.post("/register")

module.exports = router;

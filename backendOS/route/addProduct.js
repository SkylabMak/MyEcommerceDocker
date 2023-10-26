const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpool");

router.post("/", async (req, res) => {
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.log("Error connecting to SQL", err);
  //     return;
  //   }
  //   console.log("connedted to MYSQL");
  // });
  const idUser = req.body.idUser;
  const productName = req.body.ProductName;
  const description = req.body.Description;
  const price = req.body.price;
  const remaining = req.body.remaining;
//   console.log(req.body)

//   let result;

  SQLPool.query(`SELECT * FROM User WHERE idUser = ? `,[idUser], (err, records) => {
    // console.log(records)
    if (records[0].Role === "seller") {
        SQLPool.query(`INSERT INTO Product (idUser, ProductName, Description, price, remaining) VALUES (?,?,?,?,?)`,[idUser,productName,description,price,remaining]) 
        res.send({"success" : true});
    } else {
      res.send({"success" : false});
    }
   
  });
 

});

module.exports = router;


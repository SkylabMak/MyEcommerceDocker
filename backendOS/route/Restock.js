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
  const idProduct = req.body.idProduct;
  const iduser = req.body.idUser
  const Quantity = req.body.Quantity;
  console.log(req.body)

  console.log("Before")
 
  SQLPool.query("SELECT remaining FROM Product WHERE idProduct = ? AND idUser = ?;",[idProduct,iduser], (err, records) => {
    console.log(records)
    let kuy = records[0].remaining;
    console.log(kuy)
    SQLPool.query("UPDATE Product SET remaining = ? WHERE idUser = ? AND idProduct = ?",[Quantity+kuy,iduser,idProduct], (err) => {
      if(err){
        res.json({"success":false})
      }
      console.log("test")
      res.json({"success":true})
    })

  })
  
});

// router.post("/register")const express = require("express");




module.exports = router;


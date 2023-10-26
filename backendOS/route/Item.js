const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpool")

router.get("/", async (req, res) => {
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL:', err);
  //     return;
  //   }
  //   console.log('Connected to MySQL!');
  // })
  SQLPool.query("SELECT * FROM Product",(err, records)=>{
    if (err) {
      res.send(err);
    }
    else res.json(records);
  })
  
})
router.get("/id/:id", async (req, res) => {
  const id = req.params.id
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL:', err);
  //     return;
  //   }
  //   console.log('Connected to MySQL!');
  // })
  SQLPool.query("SELECT * FROM Product WHERE idProduct = ?",[id],(err, records)=>{
    if (err) {
      res.send(err);
    }
    res.json(records);
  })
  
})

router.post("/idUser", async (req, res) => {
  const id = req.body.idUser
  // SQLPool.getConnection((err, connection) => {
  //   if (err) {
  //     console.error('Error connecting to MySQL:', err);
  //     return;
  //   }
  //   console.log('Connected to MySQL!');
  // })
  SQLPool.query("SELECT * FROM Product WHERE idUser = ?",[id],(err, records)=>{
    res.json(records);
  })
  
})

module.exports = router;

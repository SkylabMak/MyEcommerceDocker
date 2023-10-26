const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpoolPromise")

router.post("/", async (req, res) => {
    const idUser = req.body.idUser;
    // console.log(req.body.idUser)
    let result = []
    // SQLPool.getConnection((err, connection) => {
    //   if (err) {
    //     console.error('Error connecting to MySQL:', err);
    //     return;
    //   }
    //   console.log('Connected to MySQL!');
    //   // SQLPool.release()
    // })
    // // SQLPool.release()

    try {
      const result = await SQLPool.query(`SELECT Cart.idUser, Cart.idProduct, Quantity,ProductName,Description, price,remaining
      FROM Product inner join Cart on (Cart.idProduct = Product.idProduct) WHERE Cart.idUser = ${idUser};`);

        // const result = await SQLPool.query(`SELECT * FROM Cart inner join Product on (Cart.idProduct = Product.idProduct) WHERE Cart.idUser = ${idUser}; `);
        console.log(result[0])
        res.json(result[0])
        
        // SQLPool.le
      } catch (error) {
        res.json(result)
        console.log(error)
        throw CustomError.internal(GET_CARDS_FAILED, "Something went wrong.");
      }
    
  })
  
  module.exports = router;
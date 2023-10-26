const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpool")
router.post("/", async (req, res) => {
    console.log("run")
    // SQLPool.getConnection((err, connection) => {
    //     if (err) {
    //         console.error('Error connecting to MySQL:', err);
    //         return;
    //     }
    //     console.log('Connected to MySQL!');
    // })
    const idUser = req.body.idUser;
    const idProduct = req.body.idProduct;
    const Quantity = parseInt(req.body.Quantity);
    let success = false;
    let remaining = 0;
    console.log(req.body)
    SQLPool.query("SELECT remaining FROM Product WHERE idProduct = ?", [idProduct], (err, records) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        if (records.length > 0) {
            remaining = records[0].remaining;
            console.log(records[0].remaining)
            console.log(Quantity)
            if (remaining < Quantity){ res.send("No more left")}
            else {
                SQLPool.query("SELECT Cart.* FROM Cart WHERE idUser=? AND idProduct = ?", [idUser, idProduct], (err, records) => {
                    if (records.length > 0) {
                        if (remaining < (records[0].Quantity + Quantity)) res.send("No more left")
                        else {
                            SQLPool.query("UPDATE Cart SET Quantity = ? WHERE idUser=? AND idProduct = ? ", [records[0].Quantity + Quantity, idUser, idProduct], (err, recordU) => {
                                console.log(err)
                                console.log(recordU)
                                if (!err) {
                                    success = true;
                                    console.log(success)
                                }
                                res.send(
                                    {
                                        "success": success
                                    }
                                )
                            })
                        }
                    } else {

                        SQLPool.query("INSERT INTO Cart (idUser, idProduct, Quantity) VALUES (?, ?, ?)", [idUser, idProduct, Quantity], (err, recordsI) => {
                            console.log(err)
                            console.log(recordsI)
                            if (!err) {
                                success = true;
                                console.log(success)
                            }
                            res.send(
                                {
                                    "success": success
                                }
                            )
                        })
                    }


                })
            }
        }

    })




})

module.exports = router;
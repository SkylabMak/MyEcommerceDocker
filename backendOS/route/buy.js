const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpool")
router.post("/", async (req, res) => {
    // SQLPool.getConnection((err, connection) => {
    //     if (err) {
    //         console.error('Error connecting to MySQL:', err);
    //         return;
    //     }
    //     console.log('Connected to MySQL!');
    // })

    const idUser = req.body.idUser; /* Get idUser from body */
    let list = [];  /* list for product that can't buy */
    let error = 0;
    let rec;    /* Use to collect the records from database */

    SQLPool.query("SELECT Cart.*,Product.ProductName, Product.remaining FROM Cart LEFT JOIN Product ON (Cart.idProduct = Product.idProduct) WHERE Cart.idUser = ?", [idUser], (err, records) => { /* Query from database to check is product quantity more than remaining product or not? */
        // console.log(records);
        rec = records;

        rec.forEach(element => {    /* Checking is product can buy (check by remaining value from database) */
            if (element.Quantity > element.remaining) {
                list.push(element);
                error = 1;

            }
        }); /* Finish checking */
        if (error == 1) {   /* If can't buy, sent list of product that can't buy to body */
            res.send(list);
        }
        else if (error == 0) {  /* If can buy do process buying */
            let sum = 0;
            let idBill;
            let rec2;
            SQLPool.query("SELECT Cart.Quantity, Product.price, Cart.idProduct FROM Cart LEFT JOIN Product ON Cart.idProduct = Product.idProduct WHERE Cart.idUser = ?", [idUser], (err, records) => {  /* Query from database to get total price */

                rec2 = records;
                // console.log(records);
                records.forEach(element => {    /* Loop to get sum price */
                    sum += element.Quantity * element.price
                }); /*  Finish calculate total price */
                SQLPool.query("INSERT INTO Bill (idUser, totalPrice) VALUES (?, ?)", [idUser, sum], (err, records) => {  /* After get total price then insert Bill table */
                    if (err) {  /* Checking insert's error */
                        res.send('INSERT ERROR');
                    } else {
                        idBill = records.insertId;
                        let text = "";

                        rec2.forEach(element => {
                            text += '(' + idBill + ',' + element.idProduct + ',' + element.Quantity + '),'; /* Declare value for use to insert BillList table */
                        })
                        // console.log(records.insertId);

                        SQLPool.query("INSERT INTO BillList (idBill, idProduct, Quantity) VALUES " + text.substring(0, text.length - 1), (err, records) => { /* Insert BillList table */
                            if (err) {  /* Checking insert's error */ 
                                res.send('ERROR INSERT BillList');
                            } else {
                                SQLPool.query("DELETE FROM Cart WHERE idUser = ?;", [idUser], (err, records) => {   /* Buying success than delete product from Cart table */
                                    if (err) {  /* Checking delete's error */
                                        res.send('ERROR TO DELETE Cart');
                                    }
                                });

                                rec2.forEach(element => {   /* Loop to updata remaining product */
                                    SQLPool.query("UPDATE Product SET remaining = remaining - ? WHERE idProduct = ?;", [element.Quantity, element.idProduct], (err, records) => {   /* After buying update remaining product in Product table */
                                        if (err) {  /* Checking update's error */
                                            res.send('ERROR TO UPDATE REMAINING');
                                        }
                                    })
                                })
                                res.json(list); /* send empty list to body */
                            }
                        })  /* End of insert BillList Block */
                    }
                }); /* End of insert Bill Block */

            }); /* End of query for calculate total price Block */
        }
    })  /* End of first query Block */

})  /* End of post Block */

module.exports = router;
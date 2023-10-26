const express = require("express");
const router = express.Router();
const SQLPool = require("../DB/MySQLpoolPromise")
router.post("/", async (req, res) => {
    const idUser = req.body.idUser;
    const idProduct = req.body.idProduct;;
    let success = false;

    try {
        let Data = []
        Data = ((await SQLPool.query("SELECT * FROM Cart WHERE idUser = ? AND idProduct = ?", [idUser, idProduct]))[0])[0].Quantity
        console.log(Data)
        if (Data - 1 == 0) {
            SQLPool.query("DELETE FROM Cart WHERE idUser = ? AND idProduct = ?", [idUser, idProduct])
            // res.send({"success" : true});
        }
        else
            SQLPool.query("Update Cart SET Quantity = ? WHERE idUser = ? AND idProduct = ?", [Data - 1, idUser, idProduct])
        res.send({"success" : true});
    } catch (error) {
        res.send({"success" : false});
        console.log(error)
    }

})
module.exports = router;
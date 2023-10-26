const express = require("express");
const router = express.Router();
const cors = require('cors');
router.use(cors());
  
const item =  require("./Item");
const addItem = require("./addItem")
const remove = require("./removeItem")
const getCart = require("./getCart")
const buy = require("./buy")
const login = require("./login")
const addProduct = require("./addProduct")
const resotck = require("./Restock")
// const register = require("./login")

router.get("/",async (req, res) => {
    res.send('Hello World')
});
router.use("/getItem", item);
router.use("/", login);
router.use("/addItem",addItem);
router.use("/removeItem", remove);
router.use("/buy",buy);
router.use("/getCart",getCart);
router.use("/addProduct",addProduct);
router.use("/resotck",resotck);
module.exports = router;
const express = require('express')
// const cors = require("cors");
const app = express()
// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "*" }));
const route = require("./route/Index.js");

// app.get('/', (req, res) => {
//   res.send('Hello World')
// })
app.use("/", route);
app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
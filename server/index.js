const express = require("express");
require("dotenv").config();

const sequelize = require("./db");
const models =require("./models/models")
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
//nastruim cors dlia otpravki zaprosov from browser
app.use(cors())
//express.json for passing json format
app.use(express.json())

// app.get('/', (req,res)=>{
//     res.status(200).json({message:"WORKING!!!"})

// })
// app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT }`));
  } catch (e) {
    console.log("error connection to DB")
    console.log(e);
  }
};
start();

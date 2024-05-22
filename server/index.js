const express = require("express");
require("dotenv").config();

const sequelize = require("./db");
const models =require("./models/models")
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router=require('./routes/index')
const path=require('path')
const PORT = process.env.PORT || 5000;
const errorHandler=require('./middleware/ErrorHandlingMiddleware');
const app = express();
//nastruim cors dlia otpravki zaprosov from browser
app.use(cors())
//express.json for passing json format
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)

// app.get('/', (req,res)=>{
//     res.status(200).json({message:"WORKING!!!"})

// })
// app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
//middleware dolzhen registrirovatisia v samom kontse
//obrabotka oshibki na nem rabota preratshaietsia i my vozvratshaiem na clienta soobtshenie ob oshibki
app.use( errorHandler)
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

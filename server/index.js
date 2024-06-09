const express = require('express');
require('dotenv').config();

const sequelize = require('./db');
const models = require('./models/models');
//function cors for send request to server  (dlia otpravki zaprosov na server)
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const path = require('path');
//esli PORT ne zadan to po umolchaniu 5000
const PORT = process.env.PORT || 5001;
// const PORT =  5001;
// console.log(" process.env.PORT", process.env.PORT)
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const app = express();
//nastruim cors dlia otpravki zaprosov from browser
app.use(cors());
//express.json for passing json format
app.use(express.json());
////////////////////////////////
// app.get('/', (req,res)=>{
  ///////200 zapros proshel bez oshibok
//     res.status(200).json({message:"WORKING!!!"})

// })
//////////////////////////////dlia otkrytia papki static///
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use('/api', router);

// app.get('/', (req,res)=>{
//     res.status(200).json({message:"WORKING!!!"})

// })
// app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));


//middleware dolzhen registrirovatisia v samom kontse
//obrabotka oshibki na nem rabota preratshaietsia i my vozvratshaiem na clienta soobtshenie ob oshibki
// zdes rabota prekratshaitsia, tak kak vyzyvaiem funktsiu next v errorHandler 
app.use(errorHandler);
const start = async () => {
  try {
    //  dlia pogkliuchenia k DB sequelize.authenticate();
    await sequelize.authenticate();
    //   funktsia sync() sveriaet sostoianie DB so skhemoi dannykh;
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log("error connection to DB");
    console.log(e);
  }
};
start();

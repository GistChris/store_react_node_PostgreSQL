const ApiError=require('../error/ApiError')
const bcrypt= require('bcrypt')
const{User,Basket }=require("../models/models")
class UserController {
  async registration(req, res,next) {
const{email,password,role}=req.body
if(!email||!password){
    return next(ApiError.badRequest())
}


  }
  async login(req, res) {}
  async check(req, res,next) {
    // res.json("WORKING WITH CONTROLLERS");
    // const query = req.query
    // res.json(query)
    const {id} = req.query
    if(!id){
        return next(ApiError.badRequest('ID is not set'))
    }
    res.json(id)
  }
}

module.exports = new UserController();

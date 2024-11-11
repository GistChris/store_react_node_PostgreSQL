const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const generateJwt=(id,email,role)=>{
 return   jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );
}
class UserController {
  async registration(req, res, next) {
    console.log("USER REGISTRATION")
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Bad password or bad email"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with this email already exists"));
    }
    //hashiryem parol, salt - skolco raz my bydem hashirovat parol
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    // const basket = await Basket.create({ userId: user.id });
    console.log("USER REGISTRATION22222222")
    const token = generateJwt(user.id,email,user.role)
    return res.json({ token });
  }
  async login(req, res,next) {
    const {email,password} =req.body
    const user =await User.findOne({where:{email}})
    
    // console.log("USER",user)
    if(!user){
        return next(ApiError.internal('User with this name is not find'))
    }
    console.log("USER EXIST")
    let comparePassword=bcrypt.compareSync(password, user.password)
    if(!comparePassword){
        return next(ApiError.internal('User with this password is not find'))
        // return res.json({token})

    }
    const token =generateJwt(user.id,user.email,user.role)
    return res.json({token})
  }
  async check(req, res, next) {
    // console.log("CHECK")
    //  res.json({message:"WORaaaKING"});
    ///funktsia check generiruet novyi token i otpravit token na client////////
    ///Grubo govoria esli polzovatel budet ispolzovat svoi account token u nego budet perezapisyvatsia//////////
    const token =generateJwt(req.user.id,req.user.email,req.user.role)
    return res.json({token})
    /////////////////////////////////
    // res.json("WORKING WITH CONTROLLERS");
    // const query = req.query
    // res.json(query.id)

    // const { id } = req.query;
    // if (!id) {
    //   return next(ApiError.badRequest('ID is not set'));
    // }
    // res.json(id);
  }
}

module.exports = new UserController();
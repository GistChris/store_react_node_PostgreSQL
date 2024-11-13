const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
class UserController {
  async registration(req, res, next) {
    console.log("USER REGISTRATION");
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
    console.log("USER REGISTRATION22222222");
    const token = generateJwt(user.id, email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // console.log("USER",user)
    if (!user) {
      return next(ApiError.internal("User  is not find"));
    }
    console.log("USER EXIST");
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("User with this password is not find"));
      // return res.json({token})
    }
    const token = generateJwt(user.id, user.email, user.role);
    // console.log("LOGINtoken",res.json({ token }));
    return res.json({ token });
  }
  async getUser(req, res, next) {
   const { userId } = req.query;
    console.log("userId", userId);
    const user = await User.findOne({ where: { id:userId } });
    const token = generateJwt(user.id, user.email, user.role);
    // return res.json({ token });
    return res.json(user);
  }
  async check(req, res, next) {
    // console.log("CHECK")
    //  res.json({message:"WORaaaKING"});
    ///funktsia check generiruet novyi token i otpravit token na client////////
    ///Grubo govoria esli polzovatel budet ispolzovat svoi account token y nego budet perezapisyvatsia//////////
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
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

  ///////UDATE/////////
  async update(req, res, next) {
    try {
      const {
        userId,
        email,
        password,
        userName,
        firstName,
        middleName,
        lastName,
        country,
        region,
        city,
        streetAddress,
        postalCode,
        phoneNumber,
      } = req.body;
      console.log("req.body", req.body);
      const user = await User.update(
        {
          email,
          password,
          userName,
          firstName,
          middleName,
          lastName,
          country,
          region,
          city,
          streetAddress,
          postalCode,
          phoneNumber,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      console.log("userUPDATE");
      // console.log("userUPDATE",res.json(user))
      //posle sozdania device peredaem informatsiu na klienta
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new UserController();

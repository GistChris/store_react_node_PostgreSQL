const { Rating } = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async create(req, res) {
    console.log("RATINGCONTROLLER", req.body);
    // const { rate } = req.body;
    console.log("RATeCONTROLLER", req.body.rate);
    console.log("deviceIdCONTROLLER", req.body.deviceId);
    const rate = req.body.rate;
    const deviceId = req.body.deviceId;
    // const userId=1
    const userId = req.body.userId;
    // console.log("IdCONTROLLER", req.body)
    console.log("RATeCONTROLLER", rate);
    console.log("deviceIdCONTROLLER", deviceId);
    console.log("userIdCONTROLLER", userId);
    // const rating = await Rating.create({ rate });
    const rating = await Rating.create({ rate, deviceId, userId });
 
    // return res.json(rate);
    // console.log("RATINGCONTROLLER", res.json(rate) )
    return res.json(rating);
  }
  async getAll(req, res) {
    const ratings = await Rating.findAll();
    return res.json(ratings);
  }
}

module.exports = new RatingController();

const uuid = require("uuid");
//module path est v node.js
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      //dlia sozdania imeni
      let fileName = uuid.v4() + ".jpg";
      //dlia peremetshenia fila v papku static
      //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        //na fronte budem parsit v json stroku, a backe budem peregonian v javascript objects
    let  infos = JSON.parse(info);
    // console.log("infos",infos)
          infos.forEach((i) => 
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        );
      }
      //posle sozdania device peredaem informatsiu na klienta
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      //dlia sozdania imeni
      let fileName = uuid.v4() + ".jpg";
      //dlia peremetshenia fila v papku static
      //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        //na fronte budem parsit v json stroku, a backe budem peregonian v javascript objects
    let  infos = JSON.parse(info);
    // console.log("infos",infos)
          infos.forEach((i) => 
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        );
      }
      //posle sozdania device peredaem informatsiu na klienta
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async patch(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      //dlia sozdania imeni
      let fileName = uuid.v4() + ".jpg";
      //dlia peremetshenia fila v papku static
      //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        //na fronte budem parsit v json stroku, a backend budem peregonian v javascript objects
    let  infos = JSON.parse(info);
    // console.log("infos",infos)
          infos.forEach((i) => 
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        );
      }
      //posle sozdania device peredaem informatsiu na klienta
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    console.log("brandId",brandId)
    console.log(" typeId",typeId)
    console.log(" limit111", limit)
    console.log(" page",page)
    page = page || 1;
    limit = limit || 9;
    console.log(" limit222", limit)
    //offset eto otsup
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      // devices = await Device.findAll({limit, offset});
      // /////////////////////////////////////
      //.findAndCountAll for pagination
      console.log("if (!brandId && !typeId) {")
      // devices = await Device.findAndCountAll({ limit, offset });
      devices = await Device.findAndCountAll({ limit, offset });
      ////////////////////////////////////////
    }
    if (brandId && !typeId) {
      console.log("if (brandId && !typeId) {")
      // devices = await Device.findAll({ where: { brandId,limit,offset } });
      // devices = await Device.findAll({ where: { brandId } });
      devices = await Device.findAndCountAll({
        // where: { brandId, limit, offset },
        where: { brandId }, limit, offset
      });
    }
    if (!brandId && typeId) {
      console.log("if (!brandId && typeId) {")
      // devices = await Device.findAll({ where: { typeId, limit, offset } });
      // devices = await Device.findAll({ where: { typeId } });
      devices = await Device.findAndCountAll({
        // where: { typeId, limit, offset },
        where: { typeId }, limit, offset
      });
    }
    if (brandId && typeId) {
      console.log("if (brandId && typeId) ")
      // devices = await Device.findAll({
      //   // where: { typeId, brandId, limit, offset },
      //   where: { typeId, brandId,}, limit, offset 
      // });
      //  devices = await Device.findAll({ where: { brandId, brandId } });
      devices = await Device.findAndCountAll({
        // where: { typeId, brandId, limit, offset },
        where: { typeId, brandId,}, limit, offset 
      });
    }
    // console.log("devices",devices)
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();

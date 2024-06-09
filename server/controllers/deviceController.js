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
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
            // deviceId: i.deviceId,
          })
        );
      }
   
      // console.log("deVICE", device);
      //posle sozdania device peredaem informatsiu na klienta
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 19;
    //offset eto otsup
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
        // devices = await Device.findAll({limit, offset});
        // /////////////////////////////////////
      //.findAndCountAll for pagination
      devices = await Device.findAndCountAll({ limit, offset });
      ////////////////////////////////////////
    }
    if (brandId && !typeId) {
        // devices = await Device.findAll({ where: { brandId,limit,offset } });
        // devices = await Device.findAll({ where: { brandId } });
      devices = await Device.findAndCountAll({
        where: { brandId, limit, offset },
      });
    }
    if (!brandId && typeId) {
        devices = await Device.findAll({ where: { typeId,limit,offset } });
      // devices = await Device.findAll({ where: { typeId } });
      devices = await Device.findAndCountAll({
        where: { typeId, limit, offset },
      });
    }
    if (brandId && typeId) {
        devices = await Device.findAll({ where: { typeId, brandId,limit,offset } });
          //  devices = await Device.findAll({ where: { brandId, brandId } });
      devices = await Device.findAndCountAll({
        where: { typeId, brandId, limit, offset },
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {

    const{id} = req.params
    const device=await Device.findOne(
        {where:{id},
        include:[{model:DeviceInfo,as:'info'}]
    },
       
    )
    return res.json(device)
  }
}

module.exports = new DeviceController();

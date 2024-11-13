const uuid = require("uuid");
//module path est v node.js
const path = require("path");
const { Device, DeviceInfo, Brand } = require("../models/models");
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
        //na fronte budem parsit v json stroku, a backend budem peregonian v javascript objects
        let infos = JSON.parse(info);
        infos.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
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
      const { name, price, brandId, typeId, info, newInfo, deviceId } =
        req.body;
      const { img } = req.files;
      //dlia sozdania imeni
      let fileName = uuid.v4() + ".jpg";
      //dlia peremetshenia fila v papku static
      //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.update(
        {
          name: name,
          price: price,
          brandId: brandId,
          typeId: typeId,
          img: fileName,
        },
        {
          where: {
            id: deviceId,
          },
        }
      );
      if (info) {
        let infos = JSON.parse(info);
        infos.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: deviceId,
          })
        );
      }
      if (newInfo) {
        //na fronte budem parsit v json stroku, a backend budem peregonian v javascript objects
        let infos = JSON.parse(newInfo);
        infos.forEach((i) =>
          DeviceInfo.update(
            {
              title: i.title,
              description: i.description,
            },
            {
              where: {
                id: i.id,
              },
            }
          )
        );
      }
      console.log("deviceUPDATE", res.json(device));
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
        let infos = JSON.parse(info);
        infos.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
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
    let { brandId, typeId, limit, page, deviceName = "SASHA" } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (deviceName) {
      devices = await Device.findAndCountAll({
        where: { name: deviceName },
        limit,
        offset,
      });
    }
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId && limit != 0) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId && limit != 0) {
      console.log("if (!brandId && typeId) {");
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId && limit != 0) {
      // devices = await Device.slice().sort((a,b)=>a.id-b.id).findAndCountAll({
      devices = await Device.findAndCountAll({
        // where: { typeId, brandId, limit, offset },
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
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
  async delete(req, res, next) {
    const { id } = req.query;
    const device = await Device.destroy({
      where: { id },
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();

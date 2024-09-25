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
         console.log("device.id", device.id);
        //na fronte budem parsit v json stroku, a backe budem peregoniat v javascript objects
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
  ///////UDATE/////////
  async update(req, res, next) {  
    try {
      const { name, price, brandId, typeId, info, newInfo,deviceId } = req.body;
      const { img } = req.files;
      console.log("img",img)
      console.log("name",name)
      console.log("price",price)
      console.log("brandId",brandId)
      console.log("typeId",typeId)
      console.log("info",info)
      console.log("newInfo",newInfo)
      console.log("deviceId",deviceId)
      //dlia sozdania imeni
      let fileName = uuid.v4() + ".jpg";
      //dlia peremetshenia fila v papku static
      //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.update(
        {
          name:name,
          price:price,
          brandId:brandId,
          typeId:typeId,
          img: fileName,
        },
        {
          where: {
            id:deviceId,
          },
        }
      );
      if (info) {
        //na fronte budem parsit v json stroku, a backend budem peregonian v javascript objects
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
        console.log("newInfo",newInfo)
        // console.log("infos",infos)
        infos.forEach((i) =>
          DeviceInfo.update({
            title: i.title,
            description: i.description,
            // deviceId: device.id,
          },  {
            where: {
              id: i.id,
            },
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
        let infos = JSON.parse(info);
        // console.log("infos",infos)
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
    // let { brandId, typeId, limit, page } = req.query;
    let { brandId, typeId, limit, page, deviceName = "SASHA" } = req.query;
    page = page || 1;
    limit = limit || 9;
    // limit = 109;
    //offset eto otsup
    let offset = page * limit - limit;
    let devices;
    // console.log("limit === 0", limit);
    // console.log("offset === 0", offset);
    // console.log("deviceName", deviceName);
    //for all device without limit
    // const brands= await Brand.findAll()
    if (deviceName) {
      // console.log("devicceName",deviceName)
      // devices = await Device.findAll({ where: { name:"reery" } });
      // console.log("DEVICES1",devices)
      // devices = (await Device.findAll()).filter((item) => {
      //         return item.name.toLowerCase().includes(deviceName.toLowerCase())});
      //         console.log("DEVICES1",devices)
      // devices = await Device.findAndCountAll({    where: { price: '1' }, limit, offset })
      //////////////////////
      devices = await Device.findAndCountAll({
        where: { name: deviceName },
        limit,
        offset,
      });
      console.log("DEVICES1", devices);
      /////////////////////////
      // devices = await Device.findAndCountAll({ limit, offset }).then(filter((item) => {
      //       return item.name.toLowerCase().includes(deviceName.toLowerCase());
      //     }));
      // const filteredItems = items.filter((item) => {
      //     return item.name.toLowerCase().includes(search.toLowerCase());
      //   });
      // devices = await Device.findAll({limit, offset});
      // /////////////////////////////////////
      //.findAndCountAll for pagination
      console.log("if (!brandId && !typeId && limit === 0 && offset === 0) {");
      // devices = await Device.findAll({limit, offset});
      // devices = await Device.findAll();
      // devices = await Brand.findAll();
      // console.log ("devicesssssssssssssssss",JSON.parse(devices) )
      // devices = await Device.findAndCountAll({ limit, offset });
      ////////////////////////////////////////
    }
    if (!brandId && !typeId) {
      // devices = await Device.findAll({limit, offset});
      // /////////////////////////////////////
      //.findAndCountAll for pagination
      console.log("if (!brandId && !typeId) {");
      devices = await Device.findAndCountAll({ limit, offset });
      // console.log("DEVICES2",devices)
      ////////////////////////////////////////
    }
    if (brandId && !typeId && limit != 0) {
      console.log("if (brandId && !typeId) {");
      // devices = await Device.findAll({ where: { brandId,limit,offset } });
      // devices = await Device.findAll({ where: { brandId } });
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId && limit != 0) {
      console.log("if (!brandId && typeId) {");
      // devices = await Device.findAll({ where: { typeId, limit, offset } });
      // devices = await Device.findAll({ where: { typeId } });
      devices = await Device.findAndCountAll({
        // where: { typeId, limit, offset },
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId && limit !=0) {
      console.log("if (brandId && typeId) ");
      // devices = await Device.findAll({
      //   // where: { typeId, brandId, limit, offset },
      //   where: { typeId, brandId,}, limit, offset
      // });
      //  devices = await Device.findAll({ where: { brandId, brandId } });
      console.log("Devicehhhhhhhhhhh",Device);
      // devices = await Device.slice().sort((a,b)=>a.id-b.id).findAndCountAll({
        devices = await Device.findAndCountAll({
        // where: { typeId, brandId, limit, offset },
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    console.log("Devicehhhhhhhhhhh",Device);
    // console.log("devicesGetAll",res.json(devices.count))
    return res.json(devices);
    // return res.json.parse(devices);
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
      // include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();

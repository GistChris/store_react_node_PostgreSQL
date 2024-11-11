const sequelize = require("../db");
const { DataTypes } = require("sequelize");
// const Userr = sequelize.define("userr", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   email: { type: DataTypes.STRING, unique: true },
//   password: { type: DataTypes.STRING },
//   userName: { type: DataTypes.STRING },
//   firstName: { type: DataTypes.STRING },
//   middleName: { type: DataTypes.STRING },
//   lastName: { type: DataTypes.STRING },
//   country: { type: DataTypes.STRING },
//   region: { type: DataTypes.STRING },
//   city: { type: DataTypes.STRING },
//   streetAddress: { type: DataTypes.STRING },
//   postalCode: { type: DataTypes.STRING },
//   phoneNumber: { type: DataTypes.STRING },
//   role: { type: DataTypes.STRING, defaultValue: "USER" },
// });

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  middleName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  region: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  streetAddress: { type: DataTypes.STRING },
  postalCode: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// const Basket = sequelize.define("basket", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   userId: { type: DataTypes.INTEGER, allowNull: false },
// });

// const BasketDevice = sequelize.define("basket_device", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   basketId: { type: DataTypes.INTEGER, allowNull: false },
//   deviceId: { type: DataTypes.INTEGER, allowNull: false },
// });

const Cart = sequelize.define("cart", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  productName: { type: DataTypes.STRING, allowNull: false },
  productPrice: { type: DataTypes.INTEGER, allowNull: false },
  productRating: { type: DataTypes.INTEGER, defaultValue: 0 },
  productImg: { type: DataTypes.STRING, allowNull: false },
  productQuantity: { type: DataTypes.INTEGER, allowNull: false },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  orderItemImg: { type: DataTypes.STRING, allowNull: false },
  orderItemName: { type: DataTypes.STRING, allowNull: false },
  orderItemPrice: { type: DataTypes.INTEGER, allowNull: false },
  orderItemQuantity: { type: DataTypes.INTEGER, allowNull: false },
  orderItemTotal: { type: DataTypes.INTEGER, allowNull: false },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  deviceId: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
// Userr.hasOne(Basket);
// Basket.belongsTo(Userr);

// User.hasOne(Basket);
// Basket.belongsTo(User);

// Basket.hasMany(BasketDevice);
// BasketDevice.belongsTo(Basket);

// Device.hasMany(BasketDevice);
// BasketDevice.belongsTo(Device);

User.hasMany(Order);
Order.belongsTo(User);
// Userr.hasMany(Order);
// Order.belongsTo(Userr);

User.hasOne(Cart);
Cart.belongsTo(User);
// Userr.hasOne(Cart);
// Cart.belongsTo(Userr);

User.hasMany(Rating);
Rating.belongsTo(User);

// Userr.hasMany(Rating);
// Rating.belongsTo(Userr);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  // Userr,
  // Basket,
  // BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  TypeBrand,
  DeviceInfo,
  Cart,
  Order,
};

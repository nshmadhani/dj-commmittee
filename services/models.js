const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize("SBhCs8G7ai", "SBhCs8G7ai", "SiHSUKO7ku", {
  host: "remotemysql.com",
  dialect: "mysql"
});

var Department = sequelize.define("department", {
  name: Sequelize.STRING
});

var User = sequelize.define("user", {
  sap: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isInt: true, len: [11, 11] }
  },
  name: Sequelize.STRING,
  email: { type: Sequelize.STRING, validate: { isEmail: true } },
  type: { type: Sequelize.INTEGER },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  verified:  { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
});

//User.belongsTo(Department, {as: 'department'});


User.addHook('beforeCreate', (user, options) => {
  return bcrypt.hash(user.password, 10).then(function(hash) {
    user.password = hash;
    return user;
  });
});





var Committee = sequelize.define("committee", {
  description: Sequelize.STRING,
  name: Sequelize.STRING,
  sn:Sequelize.STRING,
  image:Sequelize.STRING,
  logo:Sequelize.STRING,
  
});
User.hasOne(Committee, {as: 'student_handler'});



var Room = sequelize.define("room", {
  name: Sequelize.STRING,
  class_lab: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  no_of_pcs: Sequelize.INTEGER
});
Room.belongsTo(Department);

var Event = sequelize.define("event", {
  name: Sequelize.STRING,
  type: Sequelize.STRING,
  start_date: { type: Sequelize.DATE },
  end_date: { type: Sequelize.DATE }
});

Committee.hasMany(Event);
Event.hasMany(Room);


var OTP = sequelize.define("otp", {
  otp: Sequelize.STRING,
  sap: Sequelize.STRING,
});

var RegisterEvent = sequelize.define("registerevent", {
  userID:  Sequelize.STRING,
  eventID: Sequelize.INTEGER
});





//TODO: Make Models better in terms of keys 
//TODO: Should we keep ID as primary key , beacuse she will ask the questions 
//TODO: host on HEroku



Department.sync()
  .then(User.sync())
  .then(Committee.sync())
  .then(Event.sync())
  .then(Room.sync())
  .then(OTP.sync())
  .then(RegisterEvent.sync())



module.exports = {
  sequelize,
  User,
  Room,
  Committee,
  Department,
  Event,
  OTP,
  RegisterEvent
}
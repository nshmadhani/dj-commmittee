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
  }
});
User.belongsTo(Department, {as: 'department'});
User.addHook('beforeCreate', (user, options) => {
  return bcrypt.hash(user.password, 10).then(function(hash) {
    user.password = hash;
    return user;
  });
});





var Committee = sequelize.define("committee", {
  description: Sequelize.STRING
});
Committee.belongsTo(Department, {as: 'department'});
User.hasOne(Committee, {as: 'teacher_handler'});
User.hasOne(Committee, {as: 'student_handler'});




var Room = sequelize.define("room", {
  name: Sequelize.STRING,
  class_lab: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  no_of_pcs: Sequelize.INTEGER
});
Room.belongsTo(Department);

var Event = sequelize.define("event", {
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  start_date: { type: Sequelize.DATE },
  end_date: { type: Sequelize.DATE }
});
Event.belongsTo(Committee);
Event.hasMany(Room);


Department.sync()
  .then(User.sync())
  .then(Committee.sync())
  .then(Event.sync())
  .then(Room.sync())



module.exports = {
  sequelize,
  User,
  Room,
  Committee,
  Department,
  Event
}
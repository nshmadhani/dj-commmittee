const Sequelize = require('sequelize')
const sequelize = new Sequelize("dj_com", "root", "", {
  host: "localhost",
  dialect: "mysql"
});
var Department = sequelize.define("department", {
  name: Sequelize.STRING
});
var User = sequelize.define("user", {
  sap: {
    type: Sequelize.STRING,
    primaryKey: true,
    validate: { isInt: true, len: [11, 11] }
  },
  name: Sequelize.STRING,
  email: { type: Sequelize.STRING, validate: { isEmail: true } },
  type: { type: Sequelize.INTEGER },
});
User.belongsTo(Department);
Department.hasMany(User);

var Committee = sequelize.define("committee", {
  handler_account_teacher: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: "sap"
    }
  },
  handler_account_student: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: "sap"
    }
  },
  dept: {
    type: Sequelize.INTEGER,
    references: {
      model: Department,
      key: "id"
    }
  },
  description: Sequelize.STRING
});
Committee.belongsTo(Department);
Department.hasMany(Committee);



var Room = sequelize.define("room", {
  name: Sequelize.STRING,
  class_lab: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  no_of_pcs: Sequelize.INTEGER
});
Room.belongsTo(Department);

var Event = sequelize.define("event", {
  committee: {
    type: Sequelize.INTEGER,
    references: {
      model: Committee,
      key: "id"
    }
  },
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  start_date: { type: Sequelize.DATE },
  end_date: { type: Sequelize.DATE }
});
Event.belongsTo(Committee);
Committee.hasMany(Event);
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
var sequelize = require('./services/models').sequelize;
module.exports = app => {

    const AdminBro = require("admin-bro");


    const AdminBroExpress = require("admin-bro-expressjs");
    const AdminBroSequelize = require("admin-bro-sequelizejs");

    AdminBro.registerAdapter(AdminBroSequelize);  
    const adminBro = new AdminBro({
        databases: [sequelize],
        rootPath: "/admin"
    });
  
    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);

    

};

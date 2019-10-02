const passport = require('passport')

module.exports = (app) => {
    app.use('/auth',require('./auth'));
    //app.use('/user',passport.authenticate('jwt'),require('./user'));
    //app.use('/committee',passport.authenticate('jwt'),require('./committee'));
}
const passport = require('passport')

module.exports = (app) => {

    //,passport.authenticate('jwt'),
    app.use('/auth',require('./auth'));
    app.use('/user',require('./user'));
    app.use('/committee',require('./committee'));
    app.use('/department',require('./department'));
    app.use('/events',require('./events'));
    app.use('/rooms',require('./rooms'));
    
}
const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;
const bcrypt = require('bcrypt')

const {
    User
} = require('./services/models');

passport.use(new LocalStrategy({
        usernameField: 'sap',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req,sap, password, cb) {
        console.log(sap,password);
        return User.findOne({
                where: {
                    sap:sap
                }
            }).then(user => {
                console.log(!user)
                if (!user) {
                    return cb(null, false, {
                        message: 'Incorrect email or password.'
                    });
                }
                return user.get({
                    plain: true
                  });
            })
            .then((user) => { return bcrypt.compare(password,user.password).then((res) =>  [res,user]) })
            .then((res) => {
                if(res[0]) {
                    return cb(null, res[1], {
                        message: 'Logged In Successfully'
                    });
                }
            })
            .catch(err => cb(err));
    }
));

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
passport.use(new JWTStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: 'NSH1000'
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        return User.findOne({
                where: {
                    id: jwtPayload.id
                }
            })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});
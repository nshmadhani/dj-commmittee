const { User , OTP} = require('./models')
const nodemailer = require('nodemailer');




module.exports.sendOtp = function(user) {
    let email = user.email;
    let otp =   Math.floor(100000 + Math.random() * 900000)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "wondersmith09@gmail.com", 
            pass: "thisisapassword"
        } 
    });
    


    let otpRecord  = OTP.build({
        otp:otp,
        sap:user.sap
    })
    otpRecord.save()
    return transporter.sendMail({
        from:"wondersmith09@gmail.com",
        to: email, 
        subject: 'Hello ✔',
        text: 'OTP For Dj Committee', 
        html: `<b>${otp}</b>` 
    });                
}


module.exports.verifyOtp = (otp,user) => {
    return OTP.findOne({
        where: {
            otp,
            sap:user.sap
        }
    }).then((otpRecord) => {
        if(otpRecord) {
            user.verified = true;
            user.save()
            //otpRecord.destroy({ force: true })
            return true
        }
        return false;
    })
}
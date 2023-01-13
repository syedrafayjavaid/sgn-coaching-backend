let mailer = require('nodemailer');
const Student = require('../models/Student');
const Coach = require('../models/Coach');

const generateEmail = (req, res, password, type, userId) => {

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'asankharidaricustomercare@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'SGN Coaching app',
        to: email,
        subject: 'SGN coaching app password',
        text: `Dear ${firstName} ${lastName} welcome to the SGN Coaching App app your password to access your account is: ${password}`
    };

    transporter.sendMail(mailOptions, async (err, response) => {
        if (err) {
            if (type === "coach") {
                await Coach.findByIdAndDelete(userId);
                res.status(500).json({ success: false, error: 'Internal Server error,possbile cause :', err })
            } else {
                await Student.findByIdAndDelete(userId);
                res.status(500).json({ success: false, error: 'Internal Server error,possbile cause :', err })
            }
        }
        else {
            res.status(200).json({ success: true, message: "OTP sent successfuly on your email account" })
        }
    })

}


module.exports = generateEmail;
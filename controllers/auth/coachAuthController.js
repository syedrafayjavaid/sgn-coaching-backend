const Coach = require('../../models/Coach');
const Student = require('../../models/Student');
const uuid4 = require('uuid4');
const shortId = require('shortid')
const generateEmail = require('./../../services/emailService')
const sendTokenResponse = require('../../utils/sendTokenResponse');



const coachRegister = async (req, res) => {

    const data = req.body;
    const password = uuid4();
    const coachId = shortId();

    // Appending password and random coach id
    data.password = password;
    data.coachId = `coach-${coachId}`;
    data.type = 'coach';

    try {
        // Checking Coach exits already
        const isCoachExistByEmail = await Coach.findOne({ email: req.body.email });
        const isStudentExistByEmail = await Student.findOne({ email: req.body.email });

        if (isCoachExistByEmail) {
            return res.status(400).json({
                success: false,
                error: `User already exist's with email ${req.body.email}`
            })
        }
        if (isStudentExistByEmail) {
            return res.status(400).json({
                success: false,
                error: `User already exist's with email ${req.body.email}`
            })
        }

        const coach = await Coach.create(data);
        generateEmail(req, res, password, "coach", coach._id);

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }

}

const coachLogin = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
            })
        }
        const coach = await Coach.findOne({ email }).select("+password");
        if (!coach) {
            return res.status(401).json({
                success: false,
                error: `Coach not found with the email ${email}`,
            })
        }

        const isMatch = await coach.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: `Invalid credentials`,
            })
        }

        // JWT token
        sendTokenResponse(coach, 200, res);



    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }

}


module.exports = { coachRegister, coachLogin }
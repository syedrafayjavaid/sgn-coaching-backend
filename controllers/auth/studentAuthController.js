const Student = require('../../models/Student');
const Coach = require('../../models/Coach');
const uuid4 = require('uuid4');
const shortId = require('shortid')
const generateEmail = require('./../../services/emailService')
const sendTokenResponse = require('../../utils/sendTokenResponse');


const studentRegister = async (req, res) => {


    const data = req.body;
    const password = uuid4();
    const studentId = shortId();

    // Appending password and random student id
    data.password = password;
    data.rollNumber = `student-${studentId}`;
    data.type = 'student'

    try {

        // Checking student exits already
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
        const student = await Student.create(data);
        generateEmail(req, res, password, "student", student._id);
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }


}

const studentLogin = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
            })
        }
        const student = await Student.findOne({ email }).select("+password");
        if (!student) {
            return res.status(401).json({
                success: false,
                error: `Student not found with the email ${email}`,
            })
        }

        const isMatch = await student.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: `Invalid credentials`,
            })
        }

        // JWT token
        sendTokenResponse(student, 200, res);



    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })

    }

}


module.exports = { studentRegister, studentLogin }
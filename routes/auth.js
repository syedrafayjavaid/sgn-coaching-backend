const { Router } = require('express')
const { coachRegister, coachLogin } = require("../controllers/auth/coachAuthController");
const { studentRegister, studentLogin } = require("../controllers/auth/studentAuthController");

const router = Router();


// Register coach
router.post("/coaches/signup", coachRegister);

// login coach
router.post("/coaches/login", coachLogin);

// Register student
router.post("/students/signup", studentRegister);

// login student
router.post("/students/login", studentLogin);

module.exports = router;
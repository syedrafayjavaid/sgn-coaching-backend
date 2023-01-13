const express = require("express");
const withAuth = require('../middlewares/auth')
const router = express.Router();

const {
    getCoaches,
    getCoach,
    updateCoach,
    deleteCoach
} = require("../controllers/coach/coachController");

router.route("/").get(getCoaches)
router.route("/:id").get(getCoach).delete(withAuth, deleteCoach).put(withAuth, updateCoach);

module.exports = router;

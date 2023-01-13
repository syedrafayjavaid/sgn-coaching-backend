const express = require("express");
const withAuth = require('../middlewares/auth')
const router = express.Router();

const {
    createCoachPackage,
    getCoachPackages,
    updateCoachPackage,
    deleteCoachPackage
} = require("../controllers/package/packageController");


router.route("/:id")
    .get(withAuth, getCoachPackages)
    .post(withAuth, createCoachPackage)
    .delete(withAuth, deleteCoachPackage)
    .put(withAuth, updateCoachPackage);

module.exports = router;

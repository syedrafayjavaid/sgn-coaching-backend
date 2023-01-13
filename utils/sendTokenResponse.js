const jwt = require("jsonwebtoken");

// sign JWT and return
const getSignedJwtToken = function (user) {
    const data = {};
    data.email = user.email;
    data.id = user._id;
    data.type = user.type;
    return jwt.sign({ user: data }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = getSignedJwtToken(user);
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // Making custom data to send in api response
    const data = {};
    data.email = user.email;
    data.firstName = user.firstName;
    data.lastName = user.lastName;

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        data: data,
    });
};


module.exports = sendTokenResponse;
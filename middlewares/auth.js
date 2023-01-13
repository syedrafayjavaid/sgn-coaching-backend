const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const JWT_SECRET = process.env.JWT_SECRET;


const withAuth = (req, res, next) => {

    try {

        const headerAuth = req.headers.authorization;
        if (headerAuth == null) return res.status(401).send({ status: 401, message: '401: Unauthorized' })
        const token = headerAuth.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send({ status: 403, message: '403: User Forbidden' });

            // Decoding token and matching user ids
            const decodedToken = jwt_decode(token);
            if (decodedToken.user.id != req.params.id) return res.status(403).send({ status: 403, message: '403: User Forbidden' })

            req.user = user
            // res.send( user);
            next()
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }

}

module.exports = withAuth;


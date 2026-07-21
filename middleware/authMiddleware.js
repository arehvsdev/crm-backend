const jwt = require("jsonwebtoken");

const auth = async( req, res, next) => {
    const authHeader = req.headers.authorization;
    if( !authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Authorization header missing or invalid",
            status: false
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token",
            error: error.message
        });
    }
}

module.exports = auth;
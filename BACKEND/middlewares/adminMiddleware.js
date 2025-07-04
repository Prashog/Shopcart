const jwt = require('jsonwebtoken')

const jwtAdminMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if(!authorization) {
            res.status(401).json({
                success: false,
                error: 'Token not found'
            })
        }
        
        const token = authorization.split(' ')[1];

        if(!token) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        if(decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Forbidden: Only admins can access this route'
            })
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            error: 'Unauthorized'
        })
    }
}

module.exports = {
    jwtAdminMiddleware
}
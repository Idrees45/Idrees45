const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1]; // Bearer token

    // Remove extra quotes if present
    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }
    console.log('Authorization Header:', authHeader); // Debug: Check the full header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' }); // Unauthorized if no token
    }

    jwt.verify(token, '123', (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err); // Debug: Log the error
            return res.status(403).json({ message: 'Failed to authenticate token' }); // Forbidden if token is invalid
        }
        req.user = decoded; // Attach decoded token payload to request object
        next(); // Pass control to the next middleware or route handler
    });
};

module.exports = authenticateToken;

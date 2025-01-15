const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   // console.log('Authorization Header:', authHeader); // Debug: Log the full header

    // Extract the token
    let token = authHeader && authHeader.split(' ')[1];

    // Check if token has extra double quotes and remove them
    if (token && (token.startsWith('"') && token.endsWith('"'))) {
        token = token.slice(1, -1);
    }

    console.log('Token:', token); // Debug: Log the extracted token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, '123', (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err); // Debug: Log error details
            // return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticateToken;

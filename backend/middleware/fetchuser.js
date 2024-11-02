const jwt = require('jsonwebtoken');
const JWT_TOKEN = "shhhhh";

const fetchuser = (req, res, next) => {
    // Get the token from the header
    const token = req.header('auth-token');

    // If no token is found, return an error
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_TOKEN);

        // Attach the user to the request object
        req.user = data.user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return an error
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;

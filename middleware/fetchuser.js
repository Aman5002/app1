var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecret';
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzM2U4OTY3NmNiN2RiNTMxNzM3MmNkIn0sImlhdCI6MTY4MTczMzgwMX0.tjUK2aEir6YOOZbBcI97hphX5LtcdTBuK47ntK50Hcw"
    const token = req.header('auth-token');
// 
    if (!token) {
        res.status(401).send({ error: "token not found" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        verifieduser = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = fetchuser;
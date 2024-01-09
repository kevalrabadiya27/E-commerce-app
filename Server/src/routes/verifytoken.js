const jwt = require('jsonwebtoken');

const varifytoken = async (req, res, next) => {
    // console.log(req.user.isAdmin);
    const authheader = req.headers.token
    if (authheader) {
        const token = authheader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid")
            }
            req.user = user;
            next();

        })
    } else {
        return res.status(401).json("You are not authenticated")
    }
};

const verifyTokenandAutorization = (req, res, next) => {
    varifytoken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not allowed to do !")
        }
    })
};

// const verifyTokenandAdmin = async (req, res, next) => {
//     varifytoken(req, res, () => {
//         // req.user.isAdmin
//         if (true) {
//             next();
//         } else {
//             res.status(403).json("You are not allowed to do that!");
//         }
//     })
// };


module.exports = { varifytoken, verifyTokenandAutorization }
const { verify } = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7); // On supprime les 7 premiers caractères par défaut "Bearer "
            verify(token, process.env.SECRET_KEY, (err, decoded) =>{
                if (err) {
                    res.json({
                        success: 0,
                        message: "Token invalide"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Accès non autorisé"
            })
        }
    },
    checkTokenId: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7); // On supprime les 7 premiers caractères par défaut "Bearer "
            verify(token, process.env.SECRET_KEY, (err, decoded) =>{
                if (err) {
                    res.json({
                        success: 0,
                        message: "Token invalide"
                    });
                } else {
                    req.sender = decoded
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Accès non autorisé"
            })
        }
    },
};
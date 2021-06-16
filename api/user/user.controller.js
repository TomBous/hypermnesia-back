const { createUser, getUserByEmail, updateUserById, getUserById, getAllUsers } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
var waterfall = require('async-waterfall');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*\d).{8,15}$/;
module.exports = {
    register: (req, res) => {
        const body = req.body;
        if (!EMAIL_REGEX.test(body.email)) {
            return res.json({
                success: 0,
                message: "Adresse email non conforme"
            }); 
        }
        if (!PASS_REGEX.test(body.password)) {
            return res.json({
                success: 0,
                message: "Mot de passe faible : 8 caractères minimum avec chiffres et lettres"
            }); 
        }

        getUserByEmail(body.email,(err, results) => { 
            if (err) {
                return;
            }
            if (results) {
                return res.json({
                    success: 0,
                    message: "Vous avez déjà un compte à cette adresse mail"
                });  
            } else if (body.firstName && body.lastName && body.email && body.password) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                createUser(body, (err,results) => {
                    if (err) {
                      return res.status(500).json({
                         success: 0,
                         message: "Echec de l'inscription"
                     })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: results
                    })
        
                });
            }
        });
    },
    login: (req, res) => {
        const body = req.body;
        if (body.email == null || body.password == null) {
            return res.status(400).json({
                success: 0,
                message: "Reseigner votre email et votre mot de passe."
            });
        }
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Email ou mot de passe incorrect"
                });
            }
            const check = compareSync(body.password, results.password);
            if (check) {
                results.password = undefined; // On reinitialise le password du résultat de la requete sql (getUserByEmail) pour ne pas l'envoyer dans la réponse
                const jsontoken = sign({result: results}, process.env.SECRET_KEY, {expiresIn: "12h"});
                return res.json({
                    success: 1,
                    message: "Authentification réussie",
                    token: jsontoken
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Mot de passe incorrect"
                })
            }
        })
    },
    findAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des utilisateurs"
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Aucun utilisateur"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération de l'utilisateur"
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Aucun utilisateur avec cet identifiant"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    updateUser: (req, res) => {
        const body = req.body;
        updateUserById(body, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec lors de la modification",
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Aucun utilisateur ne correspond"
                })

            } else {
                getUserById(body.id, (err, result) => {
                    if (err) {
                        return res.json({
                            success: 0,
                            message: "Echec de la recupération du token"
                        })
                    }
                    if (result) {
                        result.password = undefined; // On reinitialise le password du résultat de la requete sql (getUserByEmail) pour ne pas l'envoyer dans la réponse
                        const jsontoken = sign({result: result}, process.env.SECRET_KEY, {expiresIn: "12h"});
                        return res.json({
                            success: 1,
                            message: "Modification réussie",
                            token: jsontoken,
                        })
                    }
                })
            }
        });
    },
     
}
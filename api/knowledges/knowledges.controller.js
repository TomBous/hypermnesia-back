const { getLastKn, getFavKn, getPinnedKn, getUsefullKn, getFlaggedKn, updateKnViews, setPerspective, getKnById,
 getTrendingKn, getTopFavKn, getMyKn, getKnByTag, getPerspectives, getTags, createKnowledge } = require("./knowledges.services");
const { sign } = require("jsonwebtoken");
const { createContext } = require("../contexts/contexts.services");
const { createConstraint } = require("../constraints/constraints.services");
var waterfall = require('async-waterfall');

module.exports = {
    findLastKn: (req, res) => {
        const idPerspective = req.query.idPerspective;
        getLastKn(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Les savoirs n'existent pas"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findFavKn:(req, res) => {
        const data = req.query;
        getFavKn(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs favoris"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findPinnedKn:(req, res) => {
        const idPerspective = req.query.idPerspective;
        getPinnedKn(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs mis en avant"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findUsefullKn:(req, res) => {
        const idPerspective = req.query.idPerspective;
        getUsefullKn(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs utiles"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findFlaggedKn:(req, res) => {
        const idPerspective = req.query.idPerspective;
        getFlaggedKn(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs à revoir"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    trackKnViews:(req, res) => {
        const idKnowledge = req.body.idKnowledge;
        updateKnViews(idKnowledge,(err, result) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec du comptage de vues"
                })
            }
            if (result) {
                return res.status(200).json({
                    success: 1,
                    message: "Nombre de vues mis à jour"
                })
            }
        })

    },
    findTrendingKn:(req, res) => {
        const data = req.query;
        getTrendingKn(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs tendances"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findTopFavKn:(req, res) => {
        const idPerspective = req.query.idPerspective;
        getTopFavKn(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoirs top favoris trouvés"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findMyKn:(req, res) => {
        const data = req.query;
        getMyKn(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Vous n'avez écrit aucun savoirs"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findKnByTag:(req, res) => {
        const data = req.body;
        getKnByTag(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des savoirs"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoir pour ce tag"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findPerspectives:(req, res) => {
        getPerspectives((err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des perspectives"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucune perspective"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    findTags:(req, res) => {
        const idPerspective = req.query.idPerspective;
        getTags(idPerspective,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des tags"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun tag trouvé"
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    addKnowledge:(req, res) => {
        const body = req.body;
        console.log(body);
        waterfall([
            function(callback){
                createKnowledge(body.knowledge, (err,result) => {
                    if (result) {
                        callback(null, result);
                    }
                })
            },
            function(createdKnowledge, callback){ // createdKnowledge = le result de createKnowledge
                let data = {...body.knowledge, idKnowledge: createdKnowledge.insertId}
                setPerspective(data, (err,results) => {
                    if (results) {
                        callback(null, createdKnowledge);
                    }
                })
            },
            function(createdKnowledge, callback){
                let data = {...body.context, idKnowledge: createdKnowledge.insertId}
                createContext(data, (err,results) => {
                    if (results) {
                        callback(null, createdKnowledge);
                    }
                })
            },
            function(createdKnowledge, callback){
                let data = {...body.constraint, idKnowledge: createdKnowledge.insertId}
                createConstraint(data, (err,res) => {
                    if (res) {
                        callback(null, createdKnowledge.insertId);
                    }
                })
            }
          ], function (err, result) {
            if (err) {
                return res.status(400).json({
                   success: 0,
                   message: "Echec de la creation du savoir"
               })
              }
              if (result) {
                console.log("result :", result)
                return res.status(200).json({
                    success: 1,
                    message: "Le savoir a été crée",
                    knowledgeId: result,
                })
              }
          }
        );

    },
    findById:(req, res) => {
        const idKnowledge = req.params.id;
        getKnById(idKnowledge,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération du savoir"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucun savoir avec cet id."
                })
            } else {
                return res.status(200).json({
                    success: 1,
                    message: results
                })
            }
        })

    },
     
}

//*HACK if (!results || Object.keys(results) < 1) bizarre que la requette renvoie un résultat vide (objet) result devrait pas exister 
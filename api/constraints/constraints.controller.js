const { getConstraints, createConstraint, deleteConstraint } = require("./constraints.services");

   
   module.exports = {
    findConstraints: (req, res) => {
        const idKnowledge = req.query.idKnowledge;
        getConstraints(idKnowledge,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la récupération des contraintes"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Aucune contraintes"
                })
            } else {
                return res.json({
                    success: 1,
                    message: results
                })
            }
        })

    },
    addConstraint: (req, res) => {
        const data = req.body;
        createConstraint(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la creation de contexte"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Impssible de créer ce contexte"
                })
            } else {
                return res.json({
                    success: 1,
                    message: "Contexte ajouté !"
                })
            }
        })
    },
    removeById: (req, res) => {
        const id = req.params.id;
        deleteConstraint(id,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la suppression"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Impssible de supprimer ce contexte"
                })
            } else {
                return res.json({
                    success: 1,
                    message: "Contexte supprimé !"
                })
            }
        })
    },

        
   }
   
   //*HACK if (!results || Object.keys(results) < 1) bizarre que la requette renvoie un résultat vide (objet) result devrait pas exister 
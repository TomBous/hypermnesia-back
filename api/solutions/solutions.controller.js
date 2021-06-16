const { getSolutions, createSolution, createStep, getStepById, updateStep } = require("./solutions.services");

   
   module.exports = {
        findSolutions: (req, res) => {
           const idKnowledge = req.query.idKnowledge;
           getSolutions(idKnowledge,(err, results) => {
               if (err) {
                   return res.json({
                       success: 0,
                       message: "Echec de la récupération des solutions"
                   })
               }
               if (!results || Object.entries(results).length === 0) {
                   return res.json({
                       success: 0,
                       message: "Les solutions n'existent pas"
                   })
               } else {
                   return res.json({
                       success: 1,
                       message: results
                   })
               }
           })
   
       },
       addSolutions: (req, res) => {
        const data = req.body;
        createSolution(data,(err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Echec de la creation de solution"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "Impossible d'ajouter une solution"
                })
            } else {
                data.inputFields.forEach(step => {
                    step.idSolution = results.insertId;
                    console.log(step);
                    createStep(step, (err, results) => {
                        if (err) {
                            return res.json({
                                success: 0,
                                message: "Echec de la création de l'étape"
                            })
                        }
                    })
                })
                return res.json({
                    success: 1,
                    message: "Solution ajoutée"
                })
            }
        })

    },
    editStep: (req, res) => {
        const stepId = req.params.id;
        const data = req.body;
        data.stepId = stepId
        const senderId = req.sender.result.id
        getStepById(stepId, (err, results) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: "Impossible de trouver l'étape"
                })
            }
            if (!results || Object.entries(results).length === 0) {
                return res.json({
                    success: 0,
                    message: "L'étape n'existe pas"
                })
            } else {
                if (senderId === results[0].id_user) {
                    updateStep(data,(err, results) => {
                        if (err) {
                            return res.json({
                                success: 0,
                                message: "Impossible modifier l'étape"
                            })
                        }
                        if (!results || Object.entries(results).length === 0) {
                            return res.json({
                                success: 0,
                                message: "La modification a échouée"
                            })
                        } else {
                            return res.json({
                                success: 1,
                                message: results
                            })
                        }
                    })
                } else {
                    return res.status(403)
                }
            }
        })

    },
        
   }
   
   //*HACK if (!results || Object.keys(results) < 1) bizarre que la requette renvoie un résultat vide (objet) result devrait pas exister 
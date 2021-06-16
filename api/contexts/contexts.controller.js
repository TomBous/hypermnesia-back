const { getContexts, createContext, deleteContext } = require("./contexts.services");

   
   module.exports = {
        findContexts: (req, res) => {
           const idKnowledge = req.query.idKnowledge;
           getContexts(idKnowledge,(err, results) => {
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
       addContext: (req, res) => {
        const data = req.body;
        createContext(data,(err, results) => {
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
        deleteContext(id,(err, results) => {
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
   
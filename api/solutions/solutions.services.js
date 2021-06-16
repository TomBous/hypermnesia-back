const pool = require("../../config/database");

module.exports = {

    getSolutions: (idKnowledge, callBack) => {
        pool.query(`SELECT stp.id, sol.id_knowledge, sol.counter_vote, stp.id_solution, stp.position, stp.title, stp.content FROM solutions sol
        LEFT JOIN steps stp ON sol.id = stp.id_solution
        WHERE id_knowledge = ?
        ORDER BY sol.counter_vote DESC, stp.id_solution;`,
        [
            idKnowledge,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    createSolution: (data, callBack) => {
        pool.query(`INSERT INTO solutions (id_user, id_knowledge) VALUES (?,?);`,
        [
            data.idUser,
            data.idKnowledge
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    createStep: (data, callBack) => {
        pool.query(`INSERT INTO steps (id_solution, position, title, content) VALUES (?,?,?,?);`,
        [
            data.idSolution,
            data.stepNb,
            data.stepTitle,
            data.stepContent
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    getStepById: (stepId, callBack) => {
        pool.query(`SELECT stp.id, sol.id_knowledge, sol.id_user, sol.counter_vote, stp.id_solution, stp.position, stp.title, stp.content from solutions sol
        LEFT JOIN steps stp ON sol.id = stp.id_solution
        WHERE stp.id = ?;`,
        [
            stepId
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    updateStep: (data, callBack) => {
        pool.query(`UPDATE steps SET title = ?, content = ? WHERE id = ?`,
        [
            data.title,
            data.content,
            data.stepId
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    
}





//*TODO: c 

//*BUG: ca marche pas
//*BETTER: Faire un truc de ouf

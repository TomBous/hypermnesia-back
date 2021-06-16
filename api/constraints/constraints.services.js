const pool = require("../../config/database");

module.exports = {
    getConstraints: (idKnowledge, callBack) => {
        pool.query(`SELECT * FROM constraints
        WHERE id_knowledge = ? ;`,
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
    createConstraint: (data, callBack) => {
        pool.query(`INSERT INTO constraints (id_user,id_knowledge,title,content) VALUES (?,?,?,?);`,
        [
            data.idUser,
            data.idKnowledge,
            data.title,
            data.content
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    deleteConstraint: (id, callBack) => {
        pool.query(`DELETE FROM constraints WHERE id = ?;`,
        [
            id
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
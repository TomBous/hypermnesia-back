const pool = require("../../config/database");

module.exports = {

    getContexts: (idKnowledge, callBack) => {
        pool.query(`SELECT * FROM contexts
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
    createContext: (data, callBack) => {
        console.log("creation contexte")
        pool.query(`INSERT INTO contexts (id_user,id_knowledge,title,content) VALUES (?,?,?,?);`,
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
    deleteContext: (id, callBack) => {
        pool.query(`DELETE FROM contexts WHERE id = ?;`,
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
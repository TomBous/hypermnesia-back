const pool = require("../../config/database");

module.exports = {

    createUser: (data, callBack) => {
        pool.query(`INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
        [
            data.firstName,
            data.lastName,
            data.email,
            data.password,
        ],
        (error, result, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, result);
            }
        });
    },
    getUserByEmail: (email, callBack) => {
        pool.query(`SELECT * FROM users WHERE email=?`, [email],
        (error, result, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, result[0]);
            }
        });
    },
    updateUserById: (data, callBack) => {
        pool.query(`UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?`,
        [
            data.firstName,
            data.lastName,
            data.email,
            data.id,            
        ],
        (error, result, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, result);
            }
        });
    },
    getAllUsers: (callBack) => {
        pool.query(`SELECT id, firstname, lastname, email, password, tel FROM users`, [],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    getUserById: (id,callBack) => {
        pool.query(`SELECT id, firstname, lastname, email, password, tel FROM users WHERE id = ?`, [id],
        (error, result, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, result[0]);
            }
        });
    }
}





//*TODO: Faire les tables de la BDD oui Faire la requete d'enregistrement d'un user 

//*BUG: ca marche pas
//*BETTER: Faire un truc de ouf
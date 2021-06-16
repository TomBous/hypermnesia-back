const pool = require("../../config/database");

module.exports = {

    getLastKn: (idPerspective, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, id_user, media, created_at, modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives 
        ON knowledges.id = knowledges_perspectives.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        ORDER BY created_at DESC
        LIMIT 24`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, results);
            }
        });
    },
    getFavKn: (data, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        INNER JOIN users_favorited ON knowledges.id = users_favorited.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        AND users_favorited.id_user = ?
        ORDER BY users_favorited.created_at DESC`,
        [
            data.idPerspective,
            data.idUser
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getPinnedKn: (idPerspective, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        INNER JOIN knowledges_pinned ON knowledges.id = knowledges_pinned.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        ORDER BY knowledges_pinned.created_at DESC`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getUsefullKn: (idPerspective, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        ORDER BY knowledges.counter_usefull DESC
        LIMIT 32;`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getFlaggedKn: (idPerspective, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        AND knowledges.counter_flagged > 0
        ORDER BY knowledges.counter_flagged DESC
        LIMIT 32;`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    updateKnViews: (idKnowledge, callBack) => {
        pool.query(`UPDATE knowledges
        SET knowledges.counter_view = 
        (SELECT COUNT(id_knowledge) FROM knowledges_views
        WHERE id_knowledge = 3)
        WHERE knowledges.id = 3;`,
        [
            idKnowledge,
        ],
        (error, result, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, result);
            }
        });
    },
    getTrendingKn: (data, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, id_user, media, created_at, modified_at, counter_usefull, counter_flagged, counter_view, nb_views FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        INNER JOIN (SELECT id_knowledge,COUNT(*) as nb_views FROM knowledges_views WHERE timestamp >= NOW() - INTERVAL ? HOUR GROUP BY id_knowledge) trend ON knowledges.id = trend.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        ORDER BY nb_views DESC
        LIMIT 24;`,
        [
            data.intervall,
            data.idPerspective
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getTopFavKn: (idPerspective, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view, nb_fav FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        INNER JOIN (SELECT id_knowledge,COUNT(*) as nb_fav FROM users_favorited GROUP BY id_knowledge) favorited ON knowledges.id = favorited.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        ORDER BY nb_fav DESC;`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getMyKn: (data, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        AND knowledges.id_user = ?
        ORDER BY knowledges.created_at DESC;`,
        [
            data.idPerspective,
            data.idUser
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getKnByTag: (data, callBack) => {
        pool.query(`SELECT knowledges.id, problematic, knowledges.id_user, media, knowledges.created_at, knowledges.modified_at, counter_usefull, counter_flagged, counter_view, id_tag FROM knowledges 
        LEFT JOIN knowledges_perspectives ON knowledges.id = knowledges_perspectives.id_knowledge
        LEFT JOIN knowledges_tags ON knowledges.id = knowledges_tags.id_knowledge
        WHERE knowledges_perspectives.id_perspective = ?
        AND knowledges_tags.id_tag = ?
        ORDER BY knowledges.created_at DESC;`,
        [
            data.idPerspective,
            data.idTag
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getPerspectives: (callBack) => {
        pool.query(`SELECT * FROM perspectives;`,
        [ ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getTags: (idPerspective, callBack) => {
        pool.query(`select id_knowledge, id_tag, name from knowledges_tags
        left join tags on tags.id = knowledges_tags.id_tag
        where id_perspective = ?;`,
        [
            idPerspective,
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    createKnowledge: (data, callBack) => {
        pool.query(`INSERT INTO knowledges (problematic,id_user) VALUES (?,?);`,
        [   
            data.problematic,
            data.idUser
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    setPerspective: (data, callBack) => {
        pool.query(`INSERT INTO knowledges_perspectives (id_knowledge,id_perspective) VALUES (?,?);`,
        [   
            data.idKnowledge,
            data.idPerspective
        ],
        (error, results, fields) => {
            if (error) {
                return callBack(error); 
            } else {
                return callBack(null, results);
            }
        });
    },
    getKnById: (idKnowledge, callBack) => {
        pool.query(`select * from knowledges WHERE knowledges.id = ?;`,
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
}





//*TODO: c 

//*BUG: ca marche pas
//*BETTER: Faire un truc de ouf

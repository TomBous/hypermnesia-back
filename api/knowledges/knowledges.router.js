const { findLastKn, findFavKn, findPinnedKn, findUsefullKn, findFlaggedKn, addKnowledge, findById,
 trackKnViews, findTrendingKn, findTopFavKn, findMyKn, findKnByTag, findPerspectives, findTags } = require("./knowledges.controller"); 
const router = require("express").Router();
const { checkToken } = require("../auth/token.validation")

// Public routes
router.get("/perspectives", findPerspectives);
router.get("/tag_list", findTags);
// Private routes
router.get("/last", checkToken, findLastKn);
router.get("/favorited", checkToken, findFavKn);
router.get("/pinned", checkToken, findPinnedKn);
router.get("/usefull", checkToken, findUsefullKn);
router.get("/flagged", checkToken, findFlaggedKn);
router.get("/update_views", checkToken, trackKnViews);
router.get("/trending", checkToken, findTrendingKn);
router.get("/top_favorited", checkToken, findTopFavKn);
router.get("/mine", checkToken, findMyKn);
router.get("/tag", checkToken, findKnByTag);
router.get("/:id", checkToken, findById);
router.post("/add", checkToken, addKnowledge);



module.exports = router;
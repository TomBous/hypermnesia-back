const { findContexts, addContext, removeById } = require("./contexts.controller"); 
const router = require("express").Router();
const { checkToken } = require("../auth/token.validation")
   
// Public routes

// Private routes
router.get("/get_contexts", checkToken, findContexts);
router.post("/add_context", checkToken, addContext);
router.delete("/:id", checkToken, removeById);

module.exports = router;
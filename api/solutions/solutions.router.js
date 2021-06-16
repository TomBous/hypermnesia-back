const { findSolutions, addSolutions, editStep} = require("./solutions.controller"); 
const router = require("express").Router();
const { checkToken, checkTokenId } = require("../auth/token.validation")
   
// Public routes

// Private routes
router.get("/get_solutions", checkToken, findSolutions);
router.post("/add_solution", checkToken, addSolutions);
router.patch("/step/:id", checkTokenId, editStep);

module.exports = router;
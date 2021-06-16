const { findConstraints, addConstraint, removeById} = require("./constraints.controller"); 
const router = require("express").Router();
const { checkToken } = require("../auth/token.validation")
   
// Public routes

// Private routes
router.get("/get_constraints", checkToken, findConstraints);
router.post("/add_constraint", checkToken, addConstraint);
router.delete("/:id", checkToken, removeById);

module.exports = router;
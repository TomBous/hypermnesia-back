const { register, login, findAllUsers, findUserById, updateUser } = require("./user.controller"); 
const router = require("express").Router();
const { checkToken } = require("../auth/token.validation")
//Public routes
router.post("/", register);
router.post("/login", login);

// Private routes
router.get("/", checkToken, findAllUsers);
router.get("/:id", checkToken, findUserById);
router.patch("/edit", checkToken, updateUser);

module.exports = router;
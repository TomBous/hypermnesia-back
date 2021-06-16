require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter = require("./api/user/user.router");
const knowledgeRouter = require("./api/knowledges/knowledges.router");
const solutionRouter = require("./api/solutions/solutions.router");
const contextRouter = require("./api/contexts/contexts.router");
const constraintRouter = require("./api/constraints/constraints.router");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/knowledges", knowledgeRouter);
app.use("/api/solutions", solutionRouter);
app.use("/api/contexts", contextRouter);
app.use("/api/constraints", constraintRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Serveur démarre sur le port ${process.env.APP_PORT} !`)
})
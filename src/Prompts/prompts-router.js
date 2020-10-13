const express = require("express");
// const xss = require("xss");
const PromptsService = require("./prompts-service");
const { requireAuth } = require('../middleware/basic-auth')


const promptsRouter = express.Router();
// const jsonParser = express.json();

promptsRouter
    .route("/reveal-cards")
    // .all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        PromptsService.getAllPrompts(knexInstance)
            .then((prompts) => {
                res.json(prompts);
            })
            .catch(next);
    })




module.exports = promptsRouter;

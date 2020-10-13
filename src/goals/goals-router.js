const express = require("express");
const path = require('path')
const xss = require("xss");
const GoalsService = require("./goals-service");
// const { requireAuth } = require('../middleware/basic-auth')
const { requireAuth } = require('../middleware/jwt-auth')


const goalsRouter = express.Router();
const jsonParser = express.json();

// all reading goals for all users
goalsRouter
    //see all reading goals -- this would render on about page
    .route("/saved-reading-goals")
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");
        GoalsService.getAllGoals(knexInstance)
            .then((goals) => {
                res.json(goals);
            })
            .catch(next);
    })


goalsRouter
    .route("/saved-reading-goals/:goal_id") //bnb_users_id
    .all(requireAuth) //not sure if this should go here or above
    .all((req, res, next) => {
        GoalsService.getById(
            req.app.get('db'),
            // req.params.bnb_users_id)
            req.params.goal_id
        )
            .then((goal) => {
                if (!goal) {
                    return res.status(404).json({
                        error: { message: `Goal doesn't exist` }
                    })
                }
                res.goal = goal
                next()
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json({
            id: res.goal.id,
            tbr_number: xss(res.goal.tbr_number),
            timeframe: xss(res.goal.timeframe),
            // timeframe: goal.timeframe,
            reading_goals: xss(res.goal.reading_goals),
            date_created: res.goal.date_created

        });

    })
    .delete(requireAuth, (req, res, next) => {
        GoalsService.deleteGoal(
            req.app.get('db'),
            // req.params.bnb_users_id //should this be the goal_id?
            req.params.goal_id //should this be the goal_id?
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(requireAuth, jsonParser, (req, res, next) => {
        const { tbr_number, timeframe, reading_goals } = req.body
        const goalToUpdate = { tbr_number, timeframe, reading_goals }

        const numberOfValues = Object.values(goalToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'tbr_number', 'timeframe' or 'reading_goals'`
                }
            })
        }

        GoalsService.updateGoal(
            req.app.get('db'),
            // req.params.bnb_users_id,
            req.params.goal_id,
            goalToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)

    })


goalsRouter
    .route("/")

    // .post('/form', jsonParser, (req, res) => {
    //     console.log(req.body)
    //     res.send('POST Request received');
    // });
    .post(requireAuth, jsonParser, (req, res, next) => {
        const { tbr_number, timeframe, reading_goals } = req.body; // removed bnb_users_id add this back if doing postman requests
        const newGoal = { tbr_number, timeframe, reading_goals }; // removed bnb_users_id add this back if doing postman requests

        for (const [key, value] of Object.entries(newGoal)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        //or written like this:
        //not sure which is "better" & why
        // for (const field of ['tbr_number', 'timeframe', 'reading_goals', 'bnb_users_id'])
        //     if (!req.body[field]) {
        //         return res.status(400).json({
        //             error: `Missing '${field}' in request body`
        //         })
        //     }

        //this is how you'd link the user to the goal
        newGoal.bnb_users_id = req.user.id

        GoalsService.insertGoals(req.app.get("db"), newGoal)
            .then((goal) => {
                res
                    .status(201)
                    // .location(`/goals/${goal.id}`)
                    .location(path.posix.join(req.originalUrl, `/${goal.id}`))
                    .json(goal);
            })
            .catch(next);
    });

// all reading goals for logged in user
goalsRouter
    //see all reading goals for specified user
    .route("/saved-reading-goals/user/:bnb_users_id")
    //re-require auth when hooking up to your client & not testing in postman
    .all(requireAuth)
    .get((req, res, next) => {
        console.log("here", req.user.id, req.params)
        const knexInstance = req.app.get("db");

        //this is how you'd link the user to the goal in a post request,
        // but how do i link the user to all their goals in a get request
        bnb_users_id = req.user.id

        GoalsService.getAllGoalsForXUser(knexInstance, req.user.id)
            .then((goals) => {
                console.log("here's the goals", goals)
                res.json(goals);
            })
            .catch(next);
    })

goalsRouter
    .route("/saved-reading-goals/user/:bnb_users_id/:goal_id") //bnb_users_id
    //re-require auth when hooking up to your client & not testing in postman
    .all(requireAuth) //not sure if this should go here or above
    .all((req, res, next) => {
        GoalsService.getById(
            req.app.get('db'),
            req.params.bnb_users_id
            // req.params.goal_id
        )
            .then((goal) => {
                if (!goal) {
                    return res.status(404).json({
                        error: { message: `Goal doesn't exist` }
                    })
                }
                res.goal = goal
                next()
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json({
            id: res.goal.id,
            tbr_number: xss(res.goal.tbr_number),
            timeframe: xss(res.goal.timeframe),
            // timeframe: goal.timeframe,
            reading_goals: xss(res.goal.reading_goals),
            date_created: res.goal.date_created

        });

    })
    //re-require auth when hooking up to your client & not testing in postman
    .delete((req, res, next) => {
        GoalsService.deleteGoal(
            req.app.get('db'),
            // req.params.bnb_users_id //should this be the goal_id?
            req.params.goal_id //should this be the goal_id?
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    //re-require auth when hooking up to your client & not testing in postman
    .patch(jsonParser, (req, res, next) => {
        const { tbr_number, timeframe, reading_goals } = req.body
        const goalToUpdate = { tbr_number, timeframe, reading_goals }

        const numberOfValues = Object.values(goalToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either 'tbr_number', 'timeframe' or 'reading_goals'`
                }
            })
        }

        GoalsService.updateGoal(
            req.app.get('db'),
            // req.params.bnb_users_id,
            req.params.goal_id,
            goalToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)

    })









module.exports = goalsRouter;

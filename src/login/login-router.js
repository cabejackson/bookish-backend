const express = require('express')
const path = require('path')
const UsersService = require('../Users/users-service')
const LoginService = require('./login-service')
const { requireAuth } = require('../middleware/basic-auth')



const loginRouter = express.Router()
// const savedGamesRouter = express.Router()
const jsonBodyParser = express.json()

loginRouter

    .post('/', jsonBodyParser, (req, res, next) => {
        const { user_name, password } = req.body
        const loginUser = { user_name, password }

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })


        // const { user_name, password } = req.body

        // for (const field of ['user_name', 'password'])
        //     if (!req.body[field]) {
        //         return res.status(400).json({
        //             error: `Missing '${field}' in request body`
        //         })
        //     }

        LoginService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )

            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json({
                        error: 'Incorrect username or password',
                    })

                return LoginService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        if (!compareMatch)
                            return res.status(400).json({
                                error: 'Incorrect username or password',
                            })
                        // res.send('ok')

                        const sub = dbUser.user_name
                        const payload = { user_id: dbUser.id }
                        res.send({
                            authToken: LoginService.createJwt(sub, payload),
                        })

                        // const sub = dbUser.username
                        // const payload = { user_id: dbUser.id }
                        // res.send({
                        //     authToken: AuthService.createJwt(sub, payload),
                        // })
                    })
            })
            .catch(next)
    })

module.exports = loginRouter




// savedGamesRouter
//     .route("/")
//     // .all(requireAuth)
//     .get((req, res, next) => {
//         const knexInstance = req.app.get("db");
//         LoginService.getById(knexInstance)
//             .then((usersGames) => {
//                 res.json(usersGames);
//             })
//             .catch(next);
//     })

// loginRouter
//     .route('/')
//     .post(jsonBodyParser, (req, res, next) => {
//         const { password, user_name } = req.body
//         for (const field of ['user_name', 'password'])
//             if (!req.body[field]) {
//                 return res.status(400).json({
//                     error: `Missing '${field}' in request body`
//                 })
//             }


//         LoginService.hasUserWithUserName(
//             req.app.get('db'),
//             user_name
//         )
//             .then(hasUserWithUserName => {
//                 // if (hasUserWithUserName) {
//                 return res.status(200).json({ message: `this is a real user` })
//                 // }
//                 // return res.send('ok')


//             })
//             .catch(next)
//     })


























// const express = require('express')
// const path = require('path')
// const UsersService = require('../Users/users-service')
// const LoginService = require('./login-service')
// const { requireAuth } = require('../middleware/basic-auth')



// const loginRouter = express.Router()
// // const savedGamesRouter = express.Router()
// const jsonBodyParser = express.json()

// loginRouter

//     .post('/', jsonBodyParser, (req, res, next) => {
//         const { user_name, password } = req.body
//         const loginUser = { user_name, password }

//         for (const [key, value] of Object.entries(loginUser))
//             if (value == null)
//                 return res.status(400).json({
//                     error: `Missing '${key}' in request body`
//                 })


//         // const { user_name, password } = req.body

//         // for (const field of ['user_name', 'password'])
//         //     if (!req.body[field]) {
//         //         return res.status(400).json({
//         //             error: `Missing '${field}' in request body`
//         //         })
//         //     }

//         LoginService.getUserWithUserName(
//             req.app.get('db'),
//             loginUser.user_name
//         )

//             .then(dbUser => {
//                 if (!dbUser)
//                     return res.status(400).json({
//                         error: 'Incorrect username or password',
//                     })

//                 return LoginService.comparePasswords(loginUser.password, dbUser.password)
//                     .then(compareMatch => {
//                         if (!compareMatch)
//                             return res.status(400).json({
//                                 error: 'Incorrect username or password',
//                             })
//                         // res.send('ok')

//                         const sub = dbUser.user_name
//                         const payload = { user_id: dbUser.id }
//                         res.send({
//                             authToken: LoginService.createJwt(sub, payload),
//                         })

//                         // const sub = dbUser.username
//                         // const payload = { user_id: dbUser.id }
//                         // res.send({
//                         //     authToken: AuthService.createJwt(sub, payload),
//                         // })
//                     })
//             })
//             .catch(next)
//     })

// module.exports = loginRouter


////////////////////////////////////////////

// savedGamesRouter
//     .route("/")
//     // .all(requireAuth)
//     .get((req, res, next) => {
//         const knexInstance = req.app.get("db");
//         LoginService.getById(knexInstance)
//             .then((usersGames) => {
//                 res.json(usersGames);
//             })
//             .catch(next);
//     })

// loginRouter
//     .route('/')
//     .post(jsonBodyParser, (req, res, next) => {
//         const { password, user_name } = req.body
//         for (const field of ['user_name', 'password'])
//             if (!req.body[field]) {
//                 return res.status(400).json({
//                     error: `Missing '${field}' in request body`
//                 })
//             }


//         LoginService.hasUserWithUserName(
//             req.app.get('db'),
//             user_name
//         )
//             .then(hasUserWithUserName => {
//                 // if (hasUserWithUserName) {
//                 return res.status(200).json({ message: `this is a real user` })
//                 // }
//                 // return res.send('ok')


//             })
//             .catch(next)
//     })





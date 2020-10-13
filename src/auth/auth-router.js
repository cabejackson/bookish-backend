//same code as login, but login currently not working walking through curriculum example
const express = require('express')
const AuthService = require('./auth-service')
const bcrypt = require('bcryptjs')


const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { user_name, password } = req.body
        console.log(req.body)
        const loginUser = { user_name, password }
        // console.log('1', user_name, password)
        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400)
                    .json({
                        error: `Missing '${key}' in request body`
                    })
        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.user_name
        )
            .then(dbUser => {
                if (!dbUser)
                    return res.status(400).json(
                        {
                            error: 'Incorrect user_name or password',
                        })
                // res.send('ok')
                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(compareMatch => {
                        // console.log("this->", compareMatch)

                        if (!compareMatch) {
                            // console.log("this->", compareMatch)
                            return res.status(400).json(
                                // console.log(
                                //     '17', user_name, password,
                                //     '27', loginUser.user_name, dbUser.password,
                                //     "37", AuthService.comparePasswords(loginUser.password, dbUser.password),
                                //     bcrypt.compare(loginUser.password, dbUser.password)

                                // ),
                                {
                                    // error: `Incorrect user_name or password!!! ${loginUser.password} !== ${dbUser.password}`,
                                    error: `Incorrect user_name or password`,
                                }
                                // console.log('517', user_name, password, '27', loginUser.user_name, dbUser.password, "37", AuthService.comparePasswords(loginUser.password, dbUser.password)),

                            )
                        }

                        // res.send('ok')

                        const sub = dbUser.user_name
                        const payload = { user_id: dbUser.id }
                        res.json(
                            // console.log('11', user_name, password, '12', loginUser.user_name, dbUser.password, AuthService.comparePasswords(loginUser.password, dbUser.password)),

                            {
                                authToken: AuthService.createJwt(sub, payload),
                                // payload,
                                userId: dbUser.id
                            }

                        )
                    })
            })
            .catch(next)
    })

module.exports = authRouter
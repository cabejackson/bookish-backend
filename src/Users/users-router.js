const express = require('express')
const path = require('path')
const UsersService = require('./users-service')


const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, user_name, first_name, last_name, email } = req.body
        for (const field of ['first_name', 'last_name', 'user_name', 'email', 'password'])
            if (!req.body[field]) {
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })
            }

        const passwordError = UsersService.validatePassword(password)
        if (passwordError) {
            return res.status(400).json({ error: passwordError })
        }

        const firstNameError = UsersService.validateFirstName(first_name)
        if (firstNameError) {
            return res.status(400).json({ error: firstNameError })
        }

        const lastNameError = UsersService.validateLastName(last_name)
        if (lastNameError) {
            return res.status(400).json({ error: lastNameError })
        }


        UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
        )

            .then(hasUserWithUserName => {
                if (hasUserWithUserName) {
                    return res.status(400).json({ error: `Username already taken` })
                }
                // //it shouldnt do anything to the password
                return UsersService.hashPassword(password)
                    .then(hashedPassword => {

                        // res.send('ok')
                        const newUser = {
                            user_name,
                            password: hashedPassword,
                            first_name,
                            last_name,
                            email,
                            date_created: 'now()',
                        }

                        // const newUser = {
                        //     user_name,
                        //     password,
                        //     first_name,
                        //     last_name,
                        //     email,
                        //     date_created: 'now()',
                        // }

                        return UsersService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`)) //what does posix do?
                                    .json(UsersService.serializeUser(user))
                            })
                    })
            })


            // .then(hasUserWithUserName => {
            //     if (hasUserWithUserName) {
            //         return res.status(400).json({ error: `Username already taken` })
            //     }
            // return UsersService.hashPassword(password)
            // .then(hashedPassword => {
            // const newUser = {
            //     user_name,
            //     password: hashedPassword,
            //     first_name,
            //     last_name,
            //     email,
            //     date_created: 'now()',
            // }



            //     return UsersService.hashPassword(password)
            //         .then(unhashedPassword => {

            //             // res.send('ok')
            //             const newUser = {
            //                 user_name,
            //                 password: unhashedPassword,
            //                 first_name,
            //                 last_name,
            //                 email,
            //                 date_created: 'now()',
            //             }

            //             return UsersService.insertUser(
            //                 req.app.get('db'),
            //                 newUser
            //             )
            //                 .then(user => {
            //                     res
            //                         .status(201)
            //                         .location(path.posix.join(req.originalUrl, `/${user.id}`)) //what does posix do?
            //                         .json(UsersService.serializeUser(user))
            //                 })
            //         })
            // })
            .catch(next)
    })

module.exports = usersRouter
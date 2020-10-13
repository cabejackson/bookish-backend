
// const xss = require('xss')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')



const LoginService = {
    getById(knex, id) {
        return knex.from("bnb_users").select("*").where("id", id);
    },
    getUserWithUserName(db, user_name) {
        return db('bnb_users')
            .where({ user_name })
            .first()
        // .then(user => !!user) // what was this doing?
    },
    comparePasswords(password, hash) {
        return bcrypt.compare(password, hash)
    },
    // createJwt(subject, payload) {
    //     return jwt.sign(payload, config.JWT_SECRET, {
    //         subject,
    //         algorithm: 'HS256',
    //     })
    // },

    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    // verifyJwt(token) {
    //     return jwt.verify(token, config.JWT_SECRET, {
    //         algorithms: ['HS256']
    //     })
    // }

}

module.exports = LoginService

















// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('../config')

// const AuthService = {
//     getUserWithUserName(db, user_name) {
//         return db('blogful_users')
//             .where({ user_name })
//             .first()
//     },
//     comparePasswords(password, hash) {
//         return bcrypt.compare(password, hash)
//     },
//     createJwt(subject, payload) {
//         return jwt.sign(payload, config.JWT_SECRET, {
//             subject,
//             algorithm: 'HS256',
//         })
//     },
//     verifyJwt(token) {
//         return jwt.verify(token, config.JWT_SECRET, {
//             algorithms: ['HS256'],
//         })
//     },
//     parseBasicToken(token) {
//         return Buffer
//             .from(token, 'base64')
//             .toString()
//             .split(':')
//     },
// }

// module.exports = AuthService























// // const xss = require('xss')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('../config')



// const LoginService = {
//     getById(knex, id) {
//         return knex.from("bnb_users").select("*").where("id", id);
//     },
//     getUserWithUserName(db, user_name) {
//         return db('bnb_users')
//             .where({ user_name })
//             .first()
//         // .then(user => !!user) // what was this doing?
//     },
//     //how do you compare the passwords to validate the login?
//     comparePasswords(password, hash) {
//         return bcrypt.compare(password, hash)
//     },

//     // createJwt(subject, payload) {
//     //     return jwt.sign(payload, config.JWT_SECRET, {
//     //         subject,
//     //         algorithm: 'HS256',
//     //     })
//     // },

//     createJwt(subject, payload) {
//         return jwt.sign(payload, config.JWT_SECRET, {
//             subject,
//             algorithm: 'HS256',
//         })
//     }
//     // verifyJwt(token) {
//     //     return jwt.verify(token, config.JWT_SECRET, {
//     //         algorithms: ['HS256']
//     //     })
//     // }

// }

// module.exports = LoginService

















// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('../config')

// const AuthService = {
//     getUserWithUserName(db, user_name) {
//         return db('blogful_users')
//             .where({ user_name })
//             .first()
//     },
//     comparePasswords(password, hash) {
//         return bcrypt.compare(password, hash)
//     },
//     createJwt(subject, payload) {
//         return jwt.sign(payload, config.JWT_SECRET, {
//             subject,
//             algorithm: 'HS256',
//         })
//     },
//     verifyJwt(token) {
//         return jwt.verify(token, config.JWT_SECRET, {
//             algorithms: ['HS256'],
//         })
//     },
//     parseBasicToken(token) {
//         return Buffer
//             .from(token, 'base64')
//             .toString()
//             .split(':')
//     },
// }

// module.exports = AuthService
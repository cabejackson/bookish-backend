const xss = require('xss')
const bcrypt = require('bcryptjs')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/


const UsersService = {
    hasUserWithUserName(db, user_name) {
        return db('bnb_users')
            .where({ user_name })
            .first()
            .then(user => !!user)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain 1 upper case, lower case, number and special character'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12) //what should this val be 8 or 12? If  I run into issues change it back to 8
    },
    // hashPassword(password) {
    //     return (password)
    // },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('bnb_users')
            .returning('*')
            .then(([user]) => user)
    },
    validateFirstName(first_name) {
        if (first_name.startsWith(' ') || first_name.endsWith(' ')) {
            return 'first name must not start or end with empty spaces'
        }
    },
    validateLastName(last_name) {
        if (last_name.startsWith(' ') || last_name.endsWith(' ')) {
            return 'last name must not start or end with empty spaces'
        }
    },
    serializeUser(user) { //what needs to be serialized and what doesn't?
        return {
            id: user.id,
            first_name: xss(user.first_name),
            last_name: xss(user.last_name),
            user_name: xss(user.user_name),
            email: xss(user.email),
            date_created: new Date(user.date_created),
        }
    },

}

module.exports = UsersService
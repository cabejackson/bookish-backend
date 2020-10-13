// // querying the db didn't work well for me

// // const bcrypt = require('bcryptjs')
// const AuthService = require('../auth/auth-service')

// function requireAuth(req, res, next) {
// 	const authToken = req.get('Authorization') || ''

// 	let basicToken
// 	if (!authToken.toLowerCase().startsWith('basic ')) {
// 		return res.status(401).json({ error: 'Missing basic token' })
// 	} else {
// 		basicToken = authToken.slice('basic '.length, authToken.length)
// 	}

// 	const [tokenUserName, tokenPassword] = AuthService.parseBasicToken(basicToken)

// 	if (!tokenUserName || !tokenPassword) {
// 		return res.status(401).json({ error: 'Unauthorized request' })
// 	}

// 	AuthService.getUserWithUserName(
// 		req.app.get('db'),
// 		tokenUserName
// 	)
// 		.then(user => {
// 			if (!user) {
// 				return res.status(401).json({ error: 'Unauthorized request' })
// 			}

// 			// return bcrypt.compare(tokenPassword, user.password)
// 			return AuthService.comparePasswords(tokenPassword, user.password)
// 				.then(passwordsMatch => {
// 					if (!passwordsMatch) {
// 						return res.status(401).json({ error: 'Unauthorized request' })
// 					}

// 					req.user = user
// 					next()
// 				})
// 		})
// 		.catch(next)
// }






// // function requireAuth(req, res, next) {
// // 	// console.log('requireAuth')
// // 	console.log(req.get('Authorization'))
// // 	let basicToken
// // 	const authToken = req.get('Authorization') || ''
// // 	if (!authToken.toLowerCase().startsWith('basic ')) {
// // 		return res.status(401).json({ error: 'Missing basic token' })
// // 	} else {
// // 		basicToken = authToken.slice('basic '.length, authToken.length)
// // 	}

// // 	const [tokenUserName, tokenPassword] = Buffer
// // 		.from(basicToken, 'base64')
// // 		.toString()
// // 		.split(':')

// // 	if (!tokenUserName || !tokenPassword) {
// // 		return res.status(401).json({ error: 'Unauthorized request' })
// // 	}
// // 	// req.app.get('db')('goals')
// // 	// 	.where(
// // 	// 		{ bnb_users }
// // 	// 	);
// // 	// req.bnb_users_id = bnb_users_id

// // 	//HIIIIII
// // 	// next()

// // 	req.app.get('db')('bnb_users')
// // 		// .where({ user_name: tokenUserName })
// // 		.where({ user_name: tokenUserName })
// // 		.first()
// // 		.then(user => {
// // 			if (!user || user.password !== tokenPassword) {
// // 				console.log("user_name", tokenPassword)
// // 				return res.status(401).json({ error: 'Unauthorized request!!!!' })
// // 			}

// // 			next()
// // 		})
// // 		.catch(next)
// // }

// // module.exports = {
// // 	requireAuth,
// // }
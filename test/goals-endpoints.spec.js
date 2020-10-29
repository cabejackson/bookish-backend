const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
//const { makeGoalsArray } = require('./goals.fixtures');

describe('Goals Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('goals').truncate())

    afterEach('cleanup', () => db('goals').truncate())

    context('Given there are goals in the database', () => {
        const testGoals = [
            {
                bnb_users_id: 1,
                id: 1,
                tbr_number: 5,
                timeframe: 'October',
                reading_goals: 'Umami normcore lumbersexual kogi',
                date_created: '2100-05-22T16:28:32.615Z'
            },
            {
                bnb_users_id: 1,
                id: 2,
                tbr_number: 5,
                timeframe: 'November',
                reading_goals: 'Chartreuse jean shorts salvia truffaut.',
                date_created: '2029-01-22T16:28:32.615Z'
            },
            {
                bnb_users_id: 1,
                id: 3,
                tbr_number: 5,
                timeframe: 'Spring Break',
                reading_goals: 'craft beer tousled cray readymade.',
                date_created: '1919-12-22T16:28:32.615Z'
            },
            {
                bnb_users_id: 1,
                id: 4,
                tbr_number: 5,
                timeframe: 'Spring Break',
                reading_goals: 'Jianbing lyft venmo, iceland fanny pack selvage slow- carb tacos. ',
                date_created: '1919-12-22T16:28:32.615Z'
            },
        ];

        beforeEach('insert goals', () => {
            return db
                .into('goals')
                .insert(testGoals)
        })

        it('GET /goals responds with 200 and all of the saved goals', () => {
            return supertest(app)
                .get('/api/goals/saved-reading-goals')
                .expect(200, testGoals)
        })
    })



})


//note: first needed to seed table w/ users

// const { expect } = require('chai')
// const knex = require('knex')
// const app = require('../src/app')
// const { makeGoalsArray } = require('./goals.fixtures')

// describe.skip('Goals Endpoints', function () {
//     let db

//     function makeAuthHeader(user) {
//         const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
//         return `Basic ${token}`
//     }

//     before('make knex instance', () => {
//         db = knex({
//             client: 'pg',
//             connection: process.env.TEST_DB_URL,
//         })
//         app.set('db', db)
//     })

//     after('disconnect from db', () => db.destroy())
//     this threw errors about truncating
//     before('clean the table', () => db('goals').truncate())
//     afterEach('cleanup', () => db('goals').truncate())

//     where does the helpers.seedArticles come from ?
//         describe.only(`Protected endpoints`, () => {
//             beforeEach('insert articles', () =>
//                 helpers.seedArticlesTables(
//                     db,
//                     testUsers,
//                     testArticles,
//                     testComments,
//                 )
//             )

//             describe(`GET /api/articles/:article_id`, () => {
//                 it(`responds with 401 'Missing basic token' when no basic token`, () => {
//                     return supertest(app)
//                         .get(`/api/articles/123`)
//                         .expect(401, { error: `Missing basic token` })
//                 })

//                 it(`responds 401 'Unauthorized request' when no credentials in token`, () => {
//                     const userNoCreds = { user_name: '', password: '' }
//                     return supertest(app)
//                         .get(`/api/articles/123`)
//                         .set('Authorization', makeAuthHeader(userNoCreds))
//                         .expect(401, { error: `Unauthorized request` })
//                 })

//                 it(`responds 401 'Unauthorized request' when invalid user`, () => {
//                     const userInvalidCreds = { user_name: 'user-not', password: 'existy' }
//                     return supertest(app)
//                         .get(`/api/articles/1`)
//                         .set('Authorization', makeAuthHeader(userInvalidCreds))
//                         .expect(401, { error: `Unauthorized request` })
//                 })


//                 it(`responds 401 'Unauthorized request' when invalid password`, () => {
//                     const userInvalidPass = { user_name: testUsers[0].user_name, password: 'wrong' }
//                     return supertest(app)
//                         .get(`/api/articles/1`)
//                         .set('Authorization', makeAuthHeader(userInvalidPass))
//                         .expect(401, { error: `Unauthorized request` })
//                 })
//             })

//         })





// 	describe(`GET /api/goals/saved-reading-goals`, () => {
//             context(`Given there are no goals`, () => {
//                 it(`responds with 200 and an empty list`, () => {
//                     return supertest(app)
//                         .get('/api/goals/saved-reading-goals')
//                         .expect(200, [])
//                 })
//             })
//             context('Given there are goals in the database', () => {
//                 const testGoals = makeGoalsArray()

//                 beforeEach('insert goals', () => {
//                     return db
//                         .into('goals')
//                         .insert(testGoals)
//                 })

//                 it('GET /api/goals/saved-reading-goals responds with 200 and all of the goals', () => {
//                     return supertest(app)
//                         .get('/api/goals/saved-reading-goals')
//                         .expect(200, testGoals)
//                 })
//             })
//         })


//     describe(`GET /api/goals/saved-reading-goals/:goal_id`, () => {
//         context(`Given that specific goal doesn't exist`, () => {
//             not sure if this goes here, see ckpt 3 https://courses.thinkful.com/ei-auth-jwt-v1/checkpoint/3
//             beforeEach(() =>
//                 db.into('blogful_users').insert(testUsers)
//             )
//             it(`responds with 404`, () => {
//                 const goalId = 123456
//                 return supertest(app)
//                     .get(`/api/goals/saved-reading-goals/${goalId}`)
//                     .set('Authorization', makeAuthHeader(testUsers[0]))
//                     .expect(404, { error: { message: `Goal doesn't exist` } })
//             })
//         })
//         context('Given there are goals in the database', () => {

//             context(`Given an XSS attack goal`, () => {
//                 const maliciousGoal = {
//                     id: 999,
//                     tbr_number: 2,
//                     timeframe: 'Naughty naughty very naughty <script>alert("xss");</script>',
//                     reading_goals: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`
// 					bnb_user_id: 1

//                 }

//                 beforeEach('insert malicious goal', () => {
//                     console.log("thisss", res.body)
//                     return db
//                         .into('goals')
//                         .insert([maliciousGoal])
//                 })

//                 it('removes XSS attack reading_goals', () => {
//                     return supertest(app)
//                         .get(`/api/goals/saved-reading-goals/${maliciousGoal.id}`)
//                         .set('Authorization', makeAuthHeader(testGoals) //maybe this should be maliciousGoal
//                             .expect(200)
//                             .expect(res => {
//                                 expect(res.body.timeframe).to.eql('Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;')
//                                 expect(res.body.reading_goals).to.eql(`Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`)
//                             })

// 				})
//             })

//             const testGoals = makeGoalsArray()

//             console.log("thisss", testGoals)

//             beforeEach('insert goals', () => {
//                 return db
//                     .into('goals')
//                     .insert(testGoals)
//             })

//             it('GET /api/goals/saved-reading-goals/:goal_id responds with 200 and the specified goal', () => {
//                 const goalId = 2
//                 const expectedGoal = testGoals[goalId - 1]
//                 return supertest(app)
//                     .get(`/api/goals/saved-reading-goals/${goalId}`)
//                     .set('Authorization', makeAuthHeader(testUsers[0]))
//                     .expect(200, expectedGoal)
//             })
//         })
//     })

//     describe(`POST /api/goals`, () => {
//         it(`creates a goal, responding with 201 and the new goal`, function () {
//             this.retries(3)
//             const newGoal = {
//                 tbr_number: 2,
//                 timeframe: 'June',
//                 reading_goals: 'Test new goal content...',
//                 bnb_user_id: 1
//             }
//             return supertest(app)
//                 .post('/api/goals')
//                 .send(newGoal)
//                 .expect(201)
//                 .expect(res => {
//                     expect(res.body.tbr_number).to.eql(newGoal.tbr_number)
//                     expect(res.body.timeframe).to.eql(newGoal.timeframe)
//                     expect(res.body.reading_goals).to.eql(newGoal.reading_goals)
//                     expect(res.body).to.have.property('id')
//                     also include something with bnb_user_id
// 					expect(res.headers.location).to.eql(`/api/goals/${res.body.id}`)
//                     const expected = new Date().toLocaleString()
//                     const actual = new Date(res.body.date_created).toLocaleString()
//                     expect(actual).to.eql(expected)
//                         .then(postRes =>
//                             supertest(app)
//                                 .get(`/api/goals/${postRes.body.id}`)
//                                 .expect(postRes.body)
//                         )
//                 })
//         })



//         it(`responds with 400 and an error message when the 'tbr_number' is missing`, () => {
//             return supertest(app)
//                 .post('/api/goals')
//                 .send({
//                     timeframe: 'June',
//                     reading_goals: 'Test new goal content...',
//                     bnb_user_id: 1
//                 })
//                 .expect(400, {
//                     error: { message: `Missing 'tbr_number' in request body` }
//                 })
//         })


//         const requiredFields = ['tbr_number', 'timeframe', 'reading_goals']
//         tbr_number, timeframe, reading_goals, bnb_users_id

//         requiredFields.forEach(field => {
//             const newGoal = {
//                 tbr_number: 2,
//                 timeframe: 'June',
//                 reading_goals: 'Test new goal content...',
//                 bnb_user_id: 1
//             }

//             it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//                 delete newGoal[field]

//                 return supertest(app)
//                     .post('/api/goals')
//                     .send(newGoal)
//                     .expect(400, {
//                         error: { message: `Missing '${field}' in request body` }
//                     })
//             })
//         })
//     })


//     describe(`DELETE /api/goals/saved-reading-goals/:goal_id`, () => {
//         context(`Given no goals`, () => {
//             it(`responds with 404`, () => {
//                 const goalId = 123456
//                 return supertest(app)
//                     .delete(`/api/goals/saved-reading-goals/${goalId}`)
//                     .expect(404, { error: { message: `Goal doesn't exist` } })
//             })
//         })
//         context('Given there are goals in the database', () => {
//             const testGoals = makeGoalsArray()

//             beforeEach('insert goals', () => {
//                 return db
//                     .into('goals')
//                     .insert(testGoals)
//             })

//             it('responds with 204 and removes the goal', () => {
//                 const idToRemove = 2
//                 const expectedGoals = testGoals.filter(goal => goal.id !== idToRemove)
//                 return supertest(app)
//                     .delete(`/api/goals/saved-reading-goals/${idToRemove}`)
//                     .expect(204)
//                     .then(res =>
//                         supertest(app)
//                             .get(`/api/goals/saved-reading-goals`)
//                             .expect(expectedGoals)
//                     )
//             })
//         })

//     })

//     describe(`PATCH /api/goals/saved-reading-goals/:goal_id`, () => {
//         context(`Given no goals-->`, () => {
//             it(`responds with 404`, () => {
//                 const goalId = 123456
//                 return supertest(app)
//                     .patch(`/api/goals/saved-reading-goals/${goalId}`)
//                     .expect(404, { error: { message: `Goal doesn't exist` } })
//             })
//         })
//         context('Given there are goals in the database', () => {
//             const testGoals = makeGoalsArray()

//             beforeEach('insert goals', () => {
//                 return db
//                     .into('goals')
//                     .insert(testGoals)
//             })

//             it('responds with 204 and updates the goal', () => {
//                 const idToUpdate = 2
//                 const updateGoal = {
//                     tbr_number: 2,
//                     timeframe: 'June',
//                     reading_goals: 'Test new goal content...',
//                     bnb_user_id: 1
//                 }
//                 const expectedGoal = {
//                     ...testGoals[idToUpdate - 1],
//                     ...updateGoal
//                 }
//                 return supertest(app)
//                     .patch(`/api/goals/saved-reading-goals/${idToUpdate}`)
//                     .send(updateGoal)
//                     .expect(204)
//                     .then(res =>
//                         supertest(app)
//                             .get(`/api/goals/saved-reading-goals/$${idToUpdate}`)
//                             .expect(expectedGoal)
//                     )
//             })


//             it(`responds with 400 when no required fields supplied`, () => {
//                 const idToUpdate = 2
//                 return supertest(app)
//                     .patch(`/api/goals/saved-reading-goals/${idToUpdate}`)
//                     .send({ irrelevantField: 'foo' })
//                     .expect(400, {
//                         error: {
//                             message: `Request body must contain either 'tbr_number', 'timeframe' or 'reading_goals'`
//                         }
//                     })
//             })


//             it(`responds with 204 when updating only a subset of fields`, () => {
//                 const idToUpdate = 2
//                 const updateGoal = {
//                     tbr_number: 'updated tbr_number',
//                 }
//                 const expectedGoal = {
//                     ...testGoals[idToUpdate - 1],
//                     ...updateGoal
//                 }

//                 return supertest(app)
//                     .patch(`/api/goals/saved-reading-goals/${idToUpdate}`)
//                     .send({
//                         ...updateGoal,
//                         fieldToIgnore: 'should not be in GET response'
//                     })
//                     .expect(204)
//                     .then(res =>
//                         supertest(app)
//                             .get(`/api/goals/saved-reading-goals/${idToUpdate}`)
//                             .expect(expectedGoal)
//                     )
//             })
//         })



//     })



// })


//     .get((req, res, next) => {
//         const knexInstance = req.app.get("db");
//         GoalsService.getById(
//             knexInstance,
//             // req.params.bnb_users_id)
//             req.params.goal_id)
//             .then((goal) => {
//                 if (!goal) {
//                     return res.status(404).json({
//                         error: { message: `Goal doesn't exist` }
//                     });
//                 }

//                 res.json({
//                     id: goal.id,
//                     tbr_number: xss(goal.tbr_number),
//                     timeframe: xss(goal.timeframe),
//                     // timeframe: goal.timeframe,
//                     // reading_goals: goal.reading_goals,
//                     reading_goals: xss(goal.reading_goals),
//                     date_created: goal.date_created

//                 });

//             })
//             .catch(next);
//     })



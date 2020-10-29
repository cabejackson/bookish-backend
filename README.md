# Express Boilerplate!

Here's the backend which serves my [Bowties & Books Application](https://bookish-client.vercel.app/)! The backend manages endpoints that use GET, POST and DELETE CRUD methods. You can learn more about the Front End code [here](https://github.com/cabejackson/bookish)

https://rocky-woodland-08613.herokuapp.com/

<!-- ## Table of Contents -->

<!-- - [Demo Account](#Demo-Account)
- [Storytime](#Storytime)
- [Quick App Demo](#Quick-App-Demo) -->
<!-- - [Endpoints](#A-More-Detailed-Look)
- [Tech Stack](#Tech-Stack)
  - [Front End](#Front-End)
  - [Testing](#Testing)
  - [Production](#Production)
- [Getting Started](#Getting-Started)
  - [Server Setup](#Server-Setup)
- [Upcoming Features](#Upcoming-Features)
- [About Me](#About-Me)
  - [GitHub Profile](https://github.com/cabejackson)
  - [LinkedIn](https://www.linkedin.com/in/caleb-jackson-cabe/)
- [Special Thanks](#Special-Thanks) -->

## API Documentation

### All Endpoints

-- /api/goals
-- /api/users
-- /api/login
-- /api/auth

### JWT Auth

- `POST` request made to `/api/auth/login`

* The body of the request consists of:

```
{
  username: '',
  password: ''
}
```

### Additional Endpoints

(e.g. signing up, creating goals, viewing saved goals)

- `POST` request made to `/api/users`

* The body of the request consists of:

```
{
    "first_name": " ",
    "last_name": " ",
    "user_name": " ", // requires a unique username, so other users cannot already have that username
    "email": " ", // requires @email.com formatting
    "password": " " // requires 1uppercase, 1 lowercase, 1 special character and a number
}
```

- `POST` request made to `/api/goals`

* The body of the request consists of:

```
{
    "tbr_number": " ",
    "timeframe": " ",
    "reading_goals": " ",
    "bnb_users_id": " ", // required
}
```

- `GET` request made to `goals/saved-reading-goals/user/${userId}/${goalId}`

* The headers of the request consists of:

```
         headers: {
                    "content-type": "application/json",
                    'Authorization': `bearer ${TokenService.getCredentials().tokenKey}`, //clientside code used to retrieve the userId

                }
```

## Tech Stack

### Back End

- Node and Express
  - Authentication using JWT
  - RESTful Api
- HTML5
- CSS3

### Testing

- Supertest (integration)
- Mocha and Chai (unit)

### Database

- Postgres
- Knex.js - SQL wrapper

### Production

- Deployed via Heroku

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

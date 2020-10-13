
const GoalsService = {
    getAllGoals(knex, id) {
        return knex.select("*").from("goals");
    },
    //this gives me the goals for user with id 2, but how do I make it to where user can be changeable

    getAllGoalsForXUser(knex, bnb_users_id) {
        return knex
            .select("*")
            // .select("id")
            // .from("bnb_users")
            .from("goals")
            // .where(
            //     "bnb_users_id",
            //     bnb_users_id
            // );
            .where(
                { bnb_users_id }
            );
    },
    // .where("bnb_users")
    //WHERE bnb_users = "1" (number 1 is the user_id)

    //this gives me specific reading goals irregardless of the specific user
    getById(knex, id) {
        return knex
            .from("goals")
            .select("*")
            // .where("id", id)
            .where({ id })
            .first();
    },
    insertGoals(knex, newGoal) {
        return knex
            .insert(newGoal)
            .into("goals")
            .returning("*")
            .then((rows) => {
                return rows[0];
            });
    },
    deleteGoal(knex, id) {
        return knex("goals").where({ id }).delete();
    },
    updateGoal(knex, id, newGoalFields) { //maybe say goalContent
        return knex('goals')
            .where({ id }) // same as saying "id", id
            .update(newGoalFields)
    },
};

module.exports = GoalsService;

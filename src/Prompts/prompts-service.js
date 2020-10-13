const PromptsService = {
    getAllPrompts(knex) {
        return knex.select("*").from("prompts");
    },

    getById(knex, id) {
        return knex.from("prompts").select("*").where("id", id).first();
    },
};

module.exports = PromptsService;

exports.seed = knex => {
  // Deletes ALL fk entries
  return knex('teacher_student').del();
};

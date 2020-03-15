const { students } = require('../common/seedData.js');

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('student').del();

  // Inserts seed entries
  await knex('student').insert(students.map(student => ({ id: knex.raw('UUID()'), ...student })));
};

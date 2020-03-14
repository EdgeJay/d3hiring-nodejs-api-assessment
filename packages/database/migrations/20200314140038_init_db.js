exports.up = knex => {
  return knex.schema
    .createTable('teacher', table => {
      table.increments('id');
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 320).notNullable();
      table.timestamps(false, true);
    })
    .createTable('student', table => {
      table.increments('id');
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 320).notNullable();
      table
        .enu('status', ['active', 'suspended'])
        .notNullable()
        .defaultTo('active');
      table.timestamps(false, true);
    })
    .createTable('teacher_student', table => {
      table.increments('id');
      table
        .integer('teacher_id')
        .unsigned()
        .notNullable()
        .references('teacher.id');
      table
        .integer('student_id')
        .unsigned()
        .notNullable()
        .references('student.id');
    });
};

exports.down = knex => {
  return knex.schema
    .dropTable('teacher_student')
    .dropTable('teacher')
    .dropTable('student');
};

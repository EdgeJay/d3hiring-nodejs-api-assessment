exports.up = knex => {
  return knex.schema
    .createTable('teacher', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 320).notNullable();
      table.timestamps(false, true);
    })
    .alterTable('teacher', table => {
      table.unique('id');
      table.unique('email');
    })
    .createTable('student', table => {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 320).notNullable();
      table
        .enu('status', ['active', 'suspended'])
        .notNullable()
        .defaultTo('active');
      table.timestamps(false, true);
    })
    .alterTable('student', table => {
      table.unique('id');
      table.unique('email');
    })
    .createTable('teacher_student', table => {
      table
        .uuid('teacher_id')
        .notNullable()
        .references('teacher.id');
      table
        .uuid('student_id')
        .notNullable()
        .references('student.id');
      table.primary(['teacher_id', 'student_id']);
      table.timestamps(false, true);
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('teacher_student')
    .dropTableIfExists('teacher')
    .dropTableIfExists('student');
};

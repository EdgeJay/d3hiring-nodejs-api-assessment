const { teachers, getMapping } = require('../common/seedData.js');

exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('teacher').del();

  // Inserts seed entries
  await knex('teacher').insert(
    teachers.map(({ students, ...teacher }) => ({
      id: knex.raw('UUID()'),
      ...teacher,
    }))
  );

  const teachersList = await knex.select('id', 'email').from('teacher');

  // fetch all student data in database
  const studentsList = await knex.select('id', 'email').from('student');

  // after adding teachers, setup mapping
  const teacherStudentMaps = getMapping();
  const teacherStudentRows = teacherStudentMaps.map(row => ({
    teacher_id: teachersList.find(t => t.email === row[0]).id,
    student_id: studentsList.find(s => s.email === row[1]).id,
  }));

  // add rows to teacher_student table
  // Deletes ALL existing entries
  await knex('teacher_student').del();
  await knex('teacher_student').insert(teacherStudentRows);
};

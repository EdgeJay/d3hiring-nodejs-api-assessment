import { Next } from 'koa';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import TeacherStudent from '../models/TeacherStudent';
import { ExtendedContext, BodyInput } from '../types/koaExtended';
import ApiError, { ApiErrorCode } from '../errors/ApiError';

interface StudentsEmailArrayResponse extends BodyInput {
  students: string[];
}

export const register = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const { teacher, students } = ctx.request.body;

  if (typeof teacher === 'string' && Array.isArray(students)) {
    // Fetch Teacher object
    const teacherObj = await Teacher.query()
      .where('email', teacher)
      .first()
      .catch(() => {
        throw new ApiError(ApiErrorCode.TEACHER_NOT_FOUND);
      });

    const teacherStudentMapping = await TeacherStudent.query()
      .where('teacherId', teacherObj.id)
      .debug();
    console.log(teacherStudentMapping);
    console.log(teacherStudentMapping[0].id);
  }

  ctx.json({ statusCode: 204 });
  await next();
};

export const commonStudents = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const body: StudentsEmailArrayResponse = { students: [] };
  const { teacher } = ctx.request.query;
  if (teacher && teacher.length) {
    let teacherEmails: string[];
    if (typeof teacher === 'string') {
      teacherEmails = [teacher];
    } else {
      teacherEmails = [...teacher];
    }

    const studentsQueries = teacherEmails.map(email =>
      Teacher.relatedQuery<Student>('students').for(Teacher.query().where('email', email))
    );

    const studentsLists = await Promise.all(studentsQueries);

    if (studentsLists.length > 0) {
      // find common students that all have same assigned teachers
      // requested by query string

      // Common students with same teachers are in this array
      let commonStudentsList: Student[] = [];

      // Control list of students to check against tested list
      let currentList = studentsLists[0];

      for (let compareIndex = 1; compareIndex < studentsLists.length; compareIndex += 1) {
        // Clean up before next iteration of checks
        commonStudentsList = [];
        // Next tested list of students
        const compareList = studentsLists[compareIndex];
        for (let studentIndex = 0; studentIndex < compareList.length; studentIndex += 1) {
          const student = compareList[studentIndex];
          // if student can be found in both list, push to common students list
          if (currentList.find(s => s.id === student.id)) {
            commonStudentsList.push(student);
          }
        }

        // Now shift common students into control list,
        // and repeat process with next student list.
        currentList = [...commonStudentsList];
      }

      body.students = commonStudentsList.map(student => student.email);
    }
  }

  ctx.json({ body, statusCode: 200 });

  await next();
};

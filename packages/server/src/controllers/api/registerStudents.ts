import { Next } from 'koa';
import Student from '../../models/Student';
import Teacher from '../../models/Teacher';
import TeacherStudent from '../../models/TeacherStudent';
import { ExtendedContext } from '../../types/koaExtended';
import ApiError, { ApiErrorCode } from '../../errors/ApiError';
import {
  errorFetchTeacherMessage,
  unableToRegisterMessage,
  errorRegisterStudentMessage,
  errorStudentAlreadyRegisteredMessage,
} from '../../errors/messages';

const registerStudents = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const { teacher, students } = ctx.request.body;

  if (typeof teacher === 'string' && Array.isArray(students)) {
    // Fetch Teacher object
    const teacherObj = await Teacher.query()
      .where('email', teacher)
      .first()
      .catch(() => {
        throw new ApiError(
          ApiErrorCode.UNKNOWN_TEACHER_OR_STUDENT,
          errorFetchTeacherMessage(teacher)
        );
      });

    if (!teacherObj) {
      throw new ApiError(
        ApiErrorCode.UNKNOWN_TEACHER_OR_STUDENT,
        unableToRegisterMessage(students, teacher)
      );
    }

    const studentsToBeRegistered = await Student.query().whereIn('email', students);

    if (studentsToBeRegistered.length < 1) {
      throw new ApiError(
        ApiErrorCode.UNKNOWN_TEACHER_OR_STUDENT,
        unableToRegisterMessage(students, teacher)
      );
    }

    await TeacherStudent.query()
      .insert(
        studentsToBeRegistered.map(student => ({
          teacherId: teacherObj.id,
          studentId: student.id,
        }))
      )
      .debug()
      .catch(err => {
        if (err.name === 'DataError') {
          throw new ApiError(
            ApiErrorCode.UNABLE_TO_REGISTER_STUDENT,
            errorRegisterStudentMessage(students, teacher)
          );
        } else if (err.name === 'UniqueViolationError') {
          throw new ApiError(
            ApiErrorCode.UNABLE_TO_REGISTER_STUDENT,
            errorStudentAlreadyRegisteredMessage(students, teacher)
          );
        }
        throw err;
      });
  }

  ctx.json({ statusCode: 204 });
  await next();
};

export default registerStudents;

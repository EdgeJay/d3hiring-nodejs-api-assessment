import { Next } from 'koa';
import { ExtendedContext, RecipientsArrayResponse } from '../../types/koaExtended';
import { extractEmailMentions } from '../../utils/strings';
import Student, { StudentStatus } from '../../models/Student';
import Teacher from '../../models/Teacher';
import ApiError, { ApiErrorCode } from '../../errors/ApiError';
import { invalidInputsMessage } from '../../errors/messages';

const extractNotifiableStudentEmails = (students: Student[]): string[] => {
  return students
    .filter(student => student.status !== StudentStatus.SUSPENDED)
    .map(student => student.email);
};

const retrieveForNotifications = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const body: RecipientsArrayResponse = { recipients: [] };
  const { teacher: teacherEmail, notification } = ctx.request.body;

  if (!(typeof teacherEmail === 'string' && typeof notification === 'string')) {
    throw new ApiError(ApiErrorCode.UNABLE_TO_NOTIFY_STUDENTS, invalidInputsMessage());
  }

  // fetch teacher info, make sure it is valid teacher
  const teacher = await Teacher.query()
    .where('email', teacherEmail)
    .first();

  // do not proceed if teacher not found in database
  if (!teacher) {
    throw new ApiError(ApiErrorCode.UNABLE_TO_NOTIFY_STUDENTS, invalidInputsMessage());
  }

  // Extract student email mentions
  const studentMentions = extractEmailMentions(notification);

  // Broadcast to all students if no mentions detected
  const isBroadcast = studentMentions.length === 0;

  if (!isBroadcast) {
    // Make sure only students in database that are NOT suspended are notified
    const students = await Student.query().whereIn('email', studentMentions);
    // andWhere not method is not available due to a bug in objection.js
    // .andWhereNot('status', StudentStatus.SUSPENDED);

    body.recipients = extractNotifiableStudentEmails(students);
  } else {
    // fetch all students registered under teacher
    const teacherStudents = await Teacher.relatedQuery<Student>('students')
      .for(teacher.id)
      .debug();

    body.recipients = extractNotifiableStudentEmails(teacherStudents);
  }

  ctx.json({ body });
  await next();
};

export default retrieveForNotifications;

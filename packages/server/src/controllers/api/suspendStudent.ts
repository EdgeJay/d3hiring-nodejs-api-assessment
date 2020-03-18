import { Next } from 'koa';
import { ExtendedContext } from '../../types/koaExtended';
import Student, { StudentStatus } from '../../models/Student';
import ApiError, { ApiErrorCode } from '../../errors/ApiError';
import {
  invalidInputsMessage,
  errorFetchStudentMessage,
  updateDatabaseErrorMessage,
} from '../../errors/messages';

const suspendStudent = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const { student } = ctx.request.body;

  if (typeof student !== 'string') {
    throw new ApiError(
      ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT,
      invalidInputsMessage(),
      ctx.state.transactionId
    );
  }

  const studentObj = await Student.query()
    .where('email', student)
    .first()
    .catch(() => {
      throw new ApiError(
        ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT,
        errorFetchStudentMessage(student),
        ctx.state.transactionId
      );
    });

  if (!studentObj) {
    throw new ApiError(
      ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT,
      errorFetchStudentMessage(student),
      ctx.state.transactionId
    );
  }

  await Student.query()
    .update({
      status: StudentStatus.SUSPENDED,
    })
    .where('email', student)
    .catch(() => {
      throw new ApiError(
        ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT,
        updateDatabaseErrorMessage(),
        ctx.state.transactionId
      );
    });

  ctx.json({ statusCode: 204 });

  await next();
};

export default suspendStudent;

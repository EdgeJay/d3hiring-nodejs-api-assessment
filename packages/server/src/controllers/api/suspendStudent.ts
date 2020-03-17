import { Next } from 'koa';
import { ExtendedContext } from '../../types/koaExtended';
import Student, { StudentStatus } from '../../models/Student';
import ApiError, { ApiErrorCode } from '../../errors/ApiError';

const suspendStudent = async (ctx: ExtendedContext, next: Next): Promise<void> => {
  const { student } = ctx.request.body;

  if (typeof student === 'string') {
    const studentObj = await Student.query()
      .where('email', student)
      .first()
      .catch(() => {
        throw new ApiError(ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT);
      });

    if (!studentObj) {
      throw new ApiError(ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT);
    }

    await Student.query()
      .update({
        status: StudentStatus.SUSPENDED,
      })
      .where('email', student)
      .catch(err => {
        console.log(err);
        throw new ApiError(
          ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT,
          'Error occurred while updating database'
        );
      });

    ctx.json({ statusCode: 204 });
  }

  await next();
};

export default suspendStudent;

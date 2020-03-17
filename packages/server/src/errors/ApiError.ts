import ServerError from './ServerError';

export enum ApiErrorCode {
  STUDENTS_ALREADY_ASSIGNED = 1000,
  UNKNOWN_TEACHER_OR_STUDENT,
  UNABLE_TO_REGISTER_STUDENT,
  UNABLE_TO_SUSPEND_STUDENT,
  UNABLE_TO_NOTIFY_STUDENTS,
}

interface ApiErrorJsonOutput {
  error: {
    errorCode: number;
    type: string;
    message: string;
    details: string;
    transactionId: string;
  };
}

export default class ApiError extends ServerError {
  static getMessage(errorCode: ApiErrorCode): string {
    switch (errorCode) {
      case ApiErrorCode.STUDENTS_ALREADY_ASSIGNED:
        return 'Students already assigned';
      case ApiErrorCode.UNKNOWN_TEACHER_OR_STUDENT:
        return 'Unknown teacher or student';
      case ApiErrorCode.UNABLE_TO_REGISTER_STUDENT:
        return 'Unable to register student';
      case ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT:
        return 'Unable to suspend student';
      case ApiErrorCode.UNABLE_TO_NOTIFY_STUDENTS:
        return 'Unable to notify students';
      default:
        return 'Server error';
    }
  }

  static getStatusCode(errorCode: ApiErrorCode): number {
    switch (errorCode) {
      case ApiErrorCode.STUDENTS_ALREADY_ASSIGNED:
      case ApiErrorCode.UNKNOWN_TEACHER_OR_STUDENT:
      case ApiErrorCode.UNABLE_TO_REGISTER_STUDENT:
      case ApiErrorCode.UNABLE_TO_SUSPEND_STUDENT:
      case ApiErrorCode.UNABLE_TO_NOTIFY_STUDENTS:
        return 400;
      default:
        return 500;
    }
  }

  errorCode: number;

  constructor(errorCode: ApiErrorCode, details = '', transactionId = '') {
    super(details, transactionId);
    this.message = ApiError.getMessage(errorCode);
    this.errorCode = errorCode;
    this.statusCode = ApiError.getStatusCode(errorCode);
    this.name = 'ApiError';
    this.details = details;
  }

  toJson(): ApiErrorJsonOutput {
    return {
      error: {
        errorCode: this.errorCode,
        type: this.name,
        message: this.message,
        details: this.details,
        transactionId: this.transactionId,
      },
    };
  }
}

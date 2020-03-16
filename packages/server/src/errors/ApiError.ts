import ServerError from './ServerError';

export enum ApiErrorCode {
  STUDENTS_ALREADY_ASSIGNED = 1000,
  TEACHER_NOT_FOUND,
  STUDENT_NOT_FOUND,
}

interface ApiErrorJsonOutput {
  error: {
    errorCode: number;
    type: string;
    message: string;
    details: string;
  };
}

export default class ApiError extends ServerError {
  static getMessage(errorCode: ApiErrorCode): string {
    switch (errorCode) {
      case ApiErrorCode.STUDENTS_ALREADY_ASSIGNED:
        return 'Students already assigned';
      case ApiErrorCode.TEACHER_NOT_FOUND:
        return 'Teacher not found';
      case ApiErrorCode.STUDENT_NOT_FOUND:
        return 'Student not found';
      default:
        return '';
    }
  }

  static getStatusCode(errorCode: ApiErrorCode): number {
    switch (errorCode) {
      case ApiErrorCode.STUDENTS_ALREADY_ASSIGNED:
      case ApiErrorCode.TEACHER_NOT_FOUND:
      case ApiErrorCode.STUDENT_NOT_FOUND:
        return 400;
      default:
        return 500;
    }
  }

  errorCode: number;

  statusCode: number;

  details: string;

  constructor(errorCode: ApiErrorCode, details = '') {
    super(details);
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
      },
    };
  }
}

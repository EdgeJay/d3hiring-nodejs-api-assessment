import test from 'ava';
import uuid from 'uuid';
import ApiError, { ApiErrorCode } from './ApiError';

test('ApiError.getMessage should return "Server error" if errorCode is unknown', t => {
  t.is(ApiError.getMessage(0), 'Server error');
});

test('ApiError.getMessage should return "500" status code if errorCode is unknown', t => {
  t.is(ApiError.getStatusCode(0), 500);
});

test('ApiError.toJson() should return object in expected format', t => {
  const errorCode = ApiErrorCode.STUDENTS_ALREADY_ASSIGNED;
  const details = 'This is a test';
  const transactionId = uuid.v4();
  const message = ApiError.getMessage(errorCode);
  const apiError = new ApiError(errorCode, details, transactionId);
  const json = apiError.toJson();

  t.deepEqual(json, {
    error: {
      type: 'ApiError',
      errorCode,
      message,
      details,
      transactionId,
    },
  });
});

test('ApiError.toJson() should return object in expected format even if error code is unknown', t => {
  const errorCode = 0;
  const details = 'This is another test';
  const transactionId = uuid.v4();
  const message = ApiError.getMessage(errorCode);
  const apiError = new ApiError(errorCode, details, transactionId);
  const json = apiError.toJson();

  t.deepEqual(json, {
    error: {
      type: 'ApiError',
      errorCode,
      message,
      details,
      transactionId,
    },
  });
});

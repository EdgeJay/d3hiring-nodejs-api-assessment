export const errorFetchTeacherMessage = (teacher: string): string =>
  `Error encountered while fetching teacher[${teacher}] info`;

export const unableToRegisterMessage = (students: string[], teacher: string): string =>
  `Unable to register students[${students.join(', ')}] under teacher[${teacher}]`;

export const errorRegisterStudentMessage = (students: string[], teacher: string): string =>
  `Error encountered while registering students[${students.join(', ')}] under teacher[${teacher}]`;

export const errorStudentAlreadyRegisteredMessage = (students: string[], teacher: string): string =>
  `One or more of following students[${students.join(
    ', '
  )}] is/are already registered under teacher[${teacher}]`;

export const updateDatabaseErrorMessage = (): string => 'Error occurred while updating database';

export const invalidInputsMessage = (): string => 'Invalid inputs';

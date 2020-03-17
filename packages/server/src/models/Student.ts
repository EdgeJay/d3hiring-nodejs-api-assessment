import BaseModel from './BaseModel';

export enum StudentStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
}

export default class Student extends BaseModel {
  static tableName = 'student';

  status!: string;

  static jsonSchema = BaseModel.createJsonSchema();
}

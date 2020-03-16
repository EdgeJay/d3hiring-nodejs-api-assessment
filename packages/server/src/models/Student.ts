import BaseModel from './BaseModel';

export default class Student extends BaseModel {
  static tableName = 'student';

  status!: string;

  static jsonSchema = BaseModel.createJsonSchema();
}

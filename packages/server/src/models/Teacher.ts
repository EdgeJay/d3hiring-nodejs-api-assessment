import objection, { RelationMappings } from 'objection';
import BaseModel from './BaseModel';
import Student from './Student';

const { Model } = objection;

export default class Teacher extends BaseModel {
  static tableName = 'teacher';

  static jsonSchema = BaseModel.createJsonSchema();

  static get relationMappings(): RelationMappings {
    return {
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: 'teacher.id',
          through: {
            from: 'teacher_student.teacher_id',
            to: 'teacher_student.student_id',
          },
          to: 'student.id',
        },
      },
    };
  }
}

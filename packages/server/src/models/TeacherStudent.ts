import objection from 'objection';
import { dateStringForDatabase } from '../utils/date';

const { Model } = objection;

export default class TeacherStudent extends Model {
  static tableName = 'teacher_student';

  static get idColumn(): string[] {
    return ['teacherId', 'studentId'];
  }

  id!: string;

  teacherId!: string;

  studentId!: string;

  createdAt!: string;

  updatedAt!: string;

  static jsonSchema = {
    type: 'object',
    required: ['teacherId', 'studentId'],
    properties: {
      teacherId: { type: 'string', minLength: 36, maxLength: 36 },
      studentId: { type: 'string', minLength: 36, maxLength: 36 },
    },
  };

  $beforeInsert(): void {
    const now = dateStringForDatabase(new Date());
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate(): void {
    this.updatedAt = dateStringForDatabase(new Date());
  }
}

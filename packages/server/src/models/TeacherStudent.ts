import objection from 'objection';

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
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

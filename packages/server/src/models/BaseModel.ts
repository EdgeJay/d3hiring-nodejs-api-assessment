import objection from 'objection';
import uuid from 'uuid';

// Deliberately written in this manner as
// ESM implementation in Node.js does not support
// named imports yet.
const { Model } = objection;

interface ModelJsonSchema {
  type: string;
  required: string[];
  properties: {
    [key: string]: {
      type: string;
      minLength: number;
      maxLength: number;
    };
  };
}

interface ModelJsonSchemaOverrides {
  required?: string[];
  properties?: {
    [key: string]: {
      type: string;
      minLength: number;
      maxLength: number;
    };
  };
}

export default class BaseModel extends Model {
  static tableName = 'base_model';

  id!: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  createdAt!: string;

  updatedAt!: string;

  static createJsonSchema({
    required = [],
    properties = {},
  }: ModelJsonSchemaOverrides = {}): ModelJsonSchema {
    return {
      type: 'object',
      required: ['firstName', 'lastName', 'email', ...required],
      properties: {
        firstName: { type: 'string', minLength: 1, maxLength: 255 },
        lastName: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 320 },
        ...properties,
      },
    };
  }

  $beforeInsert(): void {
    this.id = uuid.v4();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

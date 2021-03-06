import { ParameterizedContext } from 'koa';

/**
 * Definitions for extensions to existing Koa functionalities and interfaces
 * should be stored here.
 */

interface BodyInput {
  [key: string]: unknown;
}

export interface StudentsEmailArrayResponse extends BodyInput {
  students: string[];
}

export interface RecipientsArrayResponse extends BodyInput {
  recipients: string[];
}

interface JsonInputParams {
  body?: BodyInput;
  statusCode?: number;
}

/**
 * Any custom fields, functions added to Koa context must be declared here.
 */
export interface ExtendedMiddleware {
  json: (params: JsonInputParams) => void;
}

export interface ExtendedState {
  transactionId: string;
}

export type ExtendedContext = ParameterizedContext<ExtendedState, ExtendedMiddleware>;

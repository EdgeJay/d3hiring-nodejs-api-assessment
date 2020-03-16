interface ErrorJsonOutput {
  error: {
    type: string;
    message: string;
    details: string;
  };
}

export default class ServerError extends Error {
  details: string;

  constructor(details = '') {
    super('Server error');
    this.name = 'ServerError';
    this.details = details;
  }

  toJson(): ErrorJsonOutput {
    return {
      error: {
        type: this.name,
        message: this.message,
        details: this.details,
      },
    };
  }
}

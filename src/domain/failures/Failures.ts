export abstract class Failure {
  constructor(public readonly message: string, public readonly code?: string) {}
}

export class AuthFailure extends Failure {
  constructor(message: string = 'Authentication failed', code?: string) {
    super(message, code);
  }
}

export class ValidationFailure extends Failure {
  constructor(message: string = 'Validation failed', code?: string) {
    super(message, code);
  }
}

export class NetworkFailure extends Failure {
  constructor(message: string = 'Network error occurred', code?: string) {
    super(message, code);
  }
}

export class SecurityFailure extends Failure {
  constructor(message: string = 'Security operation failed', code?: string) {
    super(message, code);
  }
}

export class NotFoundFailure extends Failure {
  constructor(message: string = 'Resource not found', code?: string) {
    super(message, code);
  }
}

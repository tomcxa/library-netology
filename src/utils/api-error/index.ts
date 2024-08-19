export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: string[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message = "Ошибка запроса", errors: string[] = []) {
    return new ApiError(400, message, errors);
  }

  static unauthorized() {
    return new ApiError(401, "Не авторизован");
  }

  static forbidden() {
    return new ApiError(403, "Нет доступа");
  }

  static notFound(message = "Запрашиваемый ресурс не найден") {
    return new ApiError(404, message);
  }
}

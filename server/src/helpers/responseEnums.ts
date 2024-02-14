enum ResponseStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  UnauthorizedCredentials = 403,
}

enum ResponseMessages {
  Success = "Operation successful",
  InvalidCredentials = "Invalid email or password",
  UserAlreadyExists = "User already exists"
}

export { ResponseStatus, ResponseMessages };

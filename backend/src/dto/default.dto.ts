export interface ResponseStructur {
  status: number;
  success: boolean;
  message: object;
  data: object;
}

export class ErrorResponse {
  public static errorBadRequest = (error: string): ResponseStructur => {
    return {
      status: 404,
      success: false,
      message: {
        response: error ? error : "Error Bad Request From Client",
      },
      data: {},
    };
  };

  public static errorForbiden = (): ResponseStructur => {
    return {
      status: 403,
      success: false,
      message: {
        response: "Forbiden 403",
      },
      data: {},
    };
  };

  public static errorInternalServer = (error: object): ResponseStructur => {
    return {
      status: 500,
      success: false,
      message: {
        response: error,
      },
      data: {},
    };
  };

  public static errorUnauthorized = (): ResponseStructur => {
    return {
      status: 401,
      success: false,
      message: {
        response: "Unauthorized Error 401",
      },
      data: {},
    };
  };

  public static errorConflict = (): ResponseStructur => {
    return {
      status: 409,
      success: false,
      message: {
        response: "Data already exist ",
      },
      data: {},
    };
  };

  public static errorValidator = (
    message: object | Array<object>
  ): ResponseStructur => {
    return {
      status: 422,
      success: false,
      message: { message },
      data: {},
    };
  };
}

export class SuccessResponse {
  public static insertResponse = (
    data: object | Array<object>
  ): ResponseStructur => {
    return {
      status: 201,
      success: true,
      message: {
        response: "Data added successfully",
      },
      data,
    };
  };

  public static updateResponse = (): ResponseStructur => {
    return {
      status: 201,
      success: true,
      message: {
        response: "Data update successfully",
      },
      data: {},
    };
  };

  public static deleteResponse = (): ResponseStructur => {
    return {
      status: 201,
      success: true,
      message: {
        response: "Data delete successfully",
      },
      data: {},
    };
  };

  public static successRequestResponse = (
    data: object | Array<object>
  ): ResponseStructur => {
    return {
      status: 200,
      success: true,
      message: {
        response: "success to access API",
      },
      data,
    };
  };
}

export interface List_Payload {
  limit: number;
  skip: number;
  sortBy: string;
  filters: Record<string, string>;
}

import { Request, Response } from "express";
import { Auth_Payload, EncodeToken, RegisterAuth_Payload } from "../dto/auth.dto";
import AuthServices from "../services/auth.services";
import {
  ErrorResponse,
  ResponseStructur,
  SuccessResponse,
} from "../dto/default.dto";
import { Controller } from "./base.controller";
import { AuthServices_Interface } from "../contract/ServiceContract";
import { validateLogin } from "../middelware/Validator";
import AuthMiddelware from "../middelware/AuthMiddelware";

export class AuthController extends Controller {
  private readonly service: AuthServices_Interface = new AuthServices();

  constructor() {
    super("Auth");
  }

  init = (): void => {
    // Init Router
    this.router.post("/", validateLogin.validateLogin, this.login);
    this.router.get("/", AuthMiddelware.auth, this.getUser);
    this.router.post(
      "/register",
      AuthMiddelware.authGuru,
      validateLogin.validateRegister,
      this.register
    );
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    //payload
    const payload = req.body as Auth_Payload;
    let response: ResponseStructur;
    try {
      const token = await this.service.login(payload);
      response = SuccessResponse.successRequestResponse(token);
    } catch (error) {
      switch (error.message) {
        case "Failed":
          response = ErrorResponse.errorUnauthorized();
          break;
        case "Block":
          response = ErrorResponse.errorBadRequest("Akun Telah di blokir");
          break;
        default:
          response = ErrorResponse.errorInternalServer(error);
          break;
      }
    }
    return res.status(response.status).send(response);
  };

  getUser = async (req: Request, res: Response): Promise<Response> => {
    //payload
    const payload = req.app.locals.user as EncodeToken;
    let response: ResponseStructur;
    try {
      response = SuccessResponse.successRequestResponse(payload.value);
    } catch (error) {
      switch (error.message) {
        case "Failed":
          response = ErrorResponse.errorUnauthorized();
          break;
        case "Block":
          response = ErrorResponse.errorBadRequest("Akun Telah di blokir");
          break;
        default:
          response = ErrorResponse.errorInternalServer(error);
          break;
      }
    }
    return res.status(response.status).send(response);
  };

  register = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body as RegisterAuth_Payload;
    let response: ResponseStructur;
    try {
      const value = await this.service.register(payload);
      response = SuccessResponse.insertResponse(value);
    } catch (error) {
      switch (error.message) {
        case "Conflik":
          response = ErrorResponse.errorConflict();
          break;
        case "Token":
          response = ErrorResponse.errorValidator({
            error: "Token Salah",
          });
          break;
        case "Failed":
          response = ErrorResponse.errorValidator({
            error: "retype password salah",
          });
          break;
        default:
          response = ErrorResponse.errorInternalServer(error);
          break;
      }
    }
    return res.status(response.status).send(response);
  };
}

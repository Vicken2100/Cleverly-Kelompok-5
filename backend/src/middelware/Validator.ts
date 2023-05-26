import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../dto/default.dto";
import Validator from "fastest-validator";

export class validateLogin {
  private static validator = new Validator();

  public static validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    const scema = {
      username: { type: "string", min: 5, max: 255, required: true },
      password: { type: "string", min: 5, max: 255, required: true },
      $$strict: true,
    };
    const result = this.validator.validate(req.body, scema);
    if (result === true) {
      next();
      return;
    }

    const response = ErrorResponse.errorValidator(result as Array<object>);
    return res.status(response.status).send(response);
  };

  public static validateRegister = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    
    console.log(req.body)
    const scema = {
      username: { type: "string", min: 5, max: 255, required: true },
      password: { type: "string", min: 5, max: 255, required: true },
      rePass: { type: "string", min: 5, max: 255, required: true },
      token: { type: "string", min: 5, max: 255, required: true },
      $$strict: true,
    };
    const result = this.validator.validate(req.body, scema);
    if (result === true) {
      next();
      return;
    }

    const response = ErrorResponse.errorValidator(result as Array<object>);
    return res.status(response.status).send(response);
  };
}

export class validateClass {
  private static validator = new Validator();
  public static validateClass = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    const scema = {
      name: { type: "string", min: 2, max: 255, required: true },
      $$strict: true,
    };
    const result = this.validator.validate(req.body, scema);
    if (result === true) {
      next();
      return;
    }

    const response = ErrorResponse.errorValidator({
      result,
    });
    return res.status(response.status).send(response);
  };

  

  public static validateSubClass = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    const scema = {
      name: { type: "string", min: 2, max: 255, required: true },
      class: { type: "string", min: 2, max: 255, required: true },
      $$strict: true,
    };
    const scemaFile = {
      image: {
        type: "object",
        props: {
          mimetype: {
            type: "string",
            enum: ["image/jpeg", "image/png", "image/jpg"],
            required: true,
          },
          size: { type: "number", max: 1000000, required: true }, // maksimal 1 MB
        },
        required: true,
      },
      materi: {
        type: "object",
        props: {
          mimetype: {
            type: "string",
            enum: [
              "application/pdf",
              "application/mspowerpoint",
              "application/vnd.ms-powerpoint",
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            required: true,
          },
          size: { type: "number", max: 10000000, required: true }, // maksimal 10 MB
        },
        required: true,
      },
    };

    const result = this.validator.validate(req.body, scema);
    if (result === true) {
      next();
      return;
    }

    const response = ErrorResponse.errorValidator({
      result: result,
    });
    return res.status(response.status).send(response);
  };

  public static validateQuiz = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    if(req.body.image){
      req.body.image = " ";
    };
    const scema = {
      judul: { type: "string", min: 1, max: 255, required: true },
      subclass: { type: "string", min: 1, max: 255, required: true },
      deskripsi: { type: "string", min: 1, max: 255, required: true },
      soal: { type: "string", min: 1, max: 255, required: true },
      tingkatkesulitan: { type: "string", min: 1, max: 255, required: true },
      nomor: {type: 'number', required : true},
      type: {type: 'boolean', required : true},
      jawaban:  { type: "string", min: 1, max: 255, required: true },
      $$strict: true,
    };
    const result = this.validator.validate(req.body, scema);
    if (result === true) {
      next();
      return;
    }

    const response = ErrorResponse.errorValidator(result as Array<object>);
    return res.status(response.status).send(response);
  };
}

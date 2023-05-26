import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../dto/default.dto";
import CryptoSecure from "../utils/CryptoSecure";
import { EncodeToken } from "../dto/auth.dto";

class AuthMiddelware {
  public static auth = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    const token = req.headers.authorization;
    const err = ErrorResponse.errorForbiden();
    if (!token) return res.status(err.status).send(err);
    try {
      const key = process.env.KEY as string;
      const verifikasi: object | string = jwt.verify(
        token.toString().split(" ")[1],
        key
      );
      delete req.headers.token;
      req.app.locals.user = verifikasi;
      next();
    } catch (error) {
      res.status(err.status).send(err);
    }
  };

  public static authGuru = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response => {
    const token = req.headers.authorization;
    const err = ErrorResponse.errorForbiden();
    if (!token) return res.status(err.status).send(err);
    try {
      const method = token.split(" ")[0];

      if (!CryptoSecure.secureCompareString(method, "Bearer")) {
        return res.status(err.status).send(err);
      }

      const key = process.env.KEY as string;

      const verifikasi: EncodeToken = jwt.verify(
        token.toString().split(" ")[1],
        key
      ) as EncodeToken;
      delete req.headers.token;

      if (!CryptoSecure.secureCompareString(verifikasi.value.status, "guru")) {
        return res.status(err.status).send(err);
      }

      if (!verifikasi.value.active) {
        return res.status(err.status).send(err);
      }

      req.app.locals.user = verifikasi.value;
      next();
    } catch (error) {
      return res.status(err.status).send(err);
    }
  };
}

export default AuthMiddelware;

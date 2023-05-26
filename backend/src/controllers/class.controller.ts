import { Request, Response } from "express";
import {
  ErrorResponse,
  List_Payload,
  ResponseStructur,
  SuccessResponse,
} from "../dto/default.dto";
import { Controller } from "./base.controller";
import { getListOptions } from "../utils/RequestParser";
import AuthMiddelware from "../middelware/AuthMiddelware";
import { validateClass } from "../middelware/Validator";
import { ClassService_Interface } from "../contract/ServiceContract";
import ClassService from "../services/class.service";
import {
  ClassCreated_Payload,
  HasilsCreated_Payload,
  QuizsCreated_Payload,
  SubClassCreated_Payload,
} from "../dto/class.dto";
import CryptoSecure from "../utils/CryptoSecure";
import * as fs from "fs-extra";
import { EncodeToken } from "../dto/auth.dto";

interface UploadedFile {
  mv: (path: string, callback: (err?: unknown) => void) => void;
  mimetype: string;
}

export class ClassController extends Controller {
  private readonly service: ClassService_Interface = new ClassService();
  constructor() {
    super("Class");
  }

  init = (): void => {
    // Init Router
    this.router.get("/", this.getAllClass);
    this.router.post(
      "/",
      AuthMiddelware.authGuru,
      validateClass.validateClass,
      this.postCreate
    );

    this.router.get("/hasils", AuthMiddelware.auth, this.getHasils);

    this.router.post("/hasils", AuthMiddelware.auth, this.insertHasils);

    this.router.get("/quiz", this.getQuizUniq);

    this.router.get("/subClass", this.getAllSubClass);

    this.router.get("/quiz/get", AuthMiddelware.auth, this.getQuizs);

    this.router.post(
      "/subClass",
      AuthMiddelware.authGuru,
      validateClass.validateSubClass,
      this.postSubCreate
    );

    this.router.post(
      "/quiz",
      AuthMiddelware.authGuru,
      validateClass.validateQuiz,
      this.postQuiz
    );

    this.router.delete("/subClass/:xid", AuthMiddelware.authGuru, this.deleteMateri);
  };

  deleteMateri = async (req: Request, res: Response) : Promise<Response> => {
    const { xid } = req.params
    let response: ResponseStructur;
    try {
      const value = await this.service.deleteMateri(xid);
      response = SuccessResponse.deleteResponse();
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  getHasils = async(req: Request, res: Response): Promise<Response> =>{
    const payload = req.app.locals.user as EncodeToken;
    let response: ResponseStructur;
    try {
      const value = await this.service.getHasils(payload.value);
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  insertHasils = async(req: Request, res: Response) : Promise<Response> =>{
    const username = req.app.locals.user as EncodeToken;
    const payload = req.body as HasilsCreated_Payload
    payload.username = username.value.username
    let response: ResponseStructur;
    try {
      const value = await this.service.insertHasil(payload);
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  getAllClass = async (req: Request, res: Response): Promise<Response> => {
    const payload = getListOptions(req) as List_Payload;
    let response: ResponseStructur;
    try {
      const value = await this.service.findAllClass(payload);
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  };

  getAllSubClass = async (req: Request, res: Response): Promise<Response> => {
    const payload = getListOptions(req) as List_Payload;
    let response: ResponseStructur;
    try {
      const value = await this.service.findAllSubClass(payload);
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  };

  postCreate = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body as ClassCreated_Payload;

    let response: ResponseStructur;
    try {
      const value = await this.service.create(payload);
      response = SuccessResponse.insertResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  };

  postQuiz = async(req: Request, res: Response) : Promise<Response> =>{
    const payload = req.body as QuizsCreated_Payload;
    let response: ResponseStructur;
    try {
      const value = await this.service.createQuiz(payload);
      response = SuccessResponse.insertResponse(value);
    } catch (error) {
      console.log(error);
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  getQuizs = async(req: Request, res: Response) : Promise<Response> =>{
    const payload = getListOptions(req) as List_Payload;
    let response: ResponseStructur;
    try {
      const value = await this.service.getQuizs(payload);
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  getQuizUniq = async (req : Request, res : Response) : Promise<Response> =>{
    let response: ResponseStructur;
    try {
      const value = await this.service.getAllQuizUniq();
      response = SuccessResponse.successRequestResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  }

  postSubCreate = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body as SubClassCreated_Payload;
    const file = req.files.image as UploadedFile;
    const materi = req.files.materi as UploadedFile;
    const fileExt = file.mimetype.split("/")[1];

    const filename = `${Date.now()}_${CryptoSecure.secureRandomString(
      20
    )}.${fileExt}`;
    const materiExt = materi.mimetype.split("/")[1];
    const materiName = `${Date.now()}_${CryptoSecure.secureRandomString(
      20
    )}.${materiExt}`;
    let response: ResponseStructur;
    try {
      // Move file to public/materi directory
      const path =
        (process.env.NODE_ENV as string) === "development" ? "src" : "build";

      fs.ensureDir(`./${path}/public`, { mode: 0o755 })
        .then(() => {
          console.log("Direktori berhasil dibuat atau sudah ada");
        })
        .catch((err: Error) => {
          console.error("Terjadi kesalahan:", err);
        });

      fs.ensureDir(`./${path}/public/materi`, { mode: 0o755 })
        .then(() => {
          console.log("Direktori berhasil dibuat atau sudah ada");
        })
        .catch((err: Error) => {
          console.error("Terjadi kesalahan:", err);
        });

      fs.ensureDir(`./${path}/public/image`, { mode: 0o755 })
        .then(() => {
          console.log("Direktori berhasil dibuat atau sudah ada");
        })
        .catch((err: Error) => {
          console.error("Terjadi kesalahan:", err);
        });

      file.mv(`./${path}/public/image/${filename}`, (err?: unknown) => {
        if (err) {
          return;
        }
      });
      materi.mv(`./${path}/public/materi/${materiName}`, (err?: unknown) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      payload.image = filename;
      payload.materi = materiName;
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }

    try {
      const value = await this.service.createdSubClass(payload);
      response = SuccessResponse.insertResponse(value);
    } catch (error) {
      response = ErrorResponse.errorInternalServer(error);
    }
    return res.status(response.status).send(response);
  };
}

import express, { Application } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { AppControllerMap } from "./controllers";
import fileUpload from "express-fileupload";
dotenv.config();

class App {
  public app: Application;
  public server: http.Server;
  private clientUrl = process.env.client as string;
  private path =
    (process.env.NODE_ENV as string) === "development" ? "src" : "build";
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(fileUpload());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use("/public", express.static(`./${this.path}/public`));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: this.clientUrl,
      })
    );
  }

  protected routes(): void {
    const router = new AppControllerMap();

    this.app.use(router.route());
  }
}

const port = 8000;
const app = new App().server;

app.listen(port);

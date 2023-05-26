import express from "express";
import { Controller } from "./base.controller";
import { AuthController } from "./auth.controller";
import { ClassController } from "./class.controller";

export class AppControllerMap {
  private readonly auth = new AuthController();
  private readonly class = new ClassController();

  constructor() {
    this.init();
  }

  init(): void {
    Object.entries(this).forEach(([_k, r]) => {
      if (r instanceof Controller) {
        r.init();
      }
    });
  }

  route(): express.Router {
    const router = express.Router();

    router.use("/login", this.auth.getRouter());
    router.use("/class", this.class.getRouter());

    return router;
  }
}

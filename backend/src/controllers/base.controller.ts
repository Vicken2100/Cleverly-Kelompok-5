import express, { Router } from "express";

export abstract class Controller {
  readonly name!: string;
  protected router = express.Router();

  constructor(name: string) {
    this.name = name;
  }

  abstract init(): void;

  getRouter(): Router {
    return this.router;
  }
}

import express from "express";

export default abstract class CommonRoutesConfig {
  protected app: express.Application;
  protected baseUri: string;
  constructor(app: express.Application, baseUri: string) {
    this.app = app;
    this.baseUri = baseUri;
  }

  abstract ConfigureRoutes(): express.Application;
}

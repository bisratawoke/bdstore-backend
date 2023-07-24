import express from "express";

export default interface IRequestWithUserObject extends express.Request {
  user: any;
}

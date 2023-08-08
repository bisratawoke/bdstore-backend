import express from "express";
import http from "node:http";
import cors from "cors";
import UserRoutesConfig from "./src/user/user.routes.config";
import ItemRoutesConfig from "./src/item/item.routes.config";
import RegionRoutesConfig from "./src/region/region.routes.config";
import path from "path";
const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const baseUri = "/api/v1";

app.get("/:fileName", (req: express.Request, res: express.Response) => {
  try {
    return res.sendFile(path.resolve(__dirname, "public", req.params.fileName));
  } catch (error) {
    return res.json(error);
  }
});
app.use(express.json());
app.use(cors());

new UserRoutesConfig(app, baseUri);
new ItemRoutesConfig(app, baseUri);
new RegionRoutesConfig(app, baseUri);
server.listen(PORT, () => console.log(`Listening on  port ${PORT}`));

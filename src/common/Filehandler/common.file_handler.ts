import multer from "multer";

import config from "../config/";
const memoryStorage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirectory: string = config.publicFilesPath;
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: memoryStorage });

export default upload;

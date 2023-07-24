import multer from "multer";

import config from "../config/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirectory: string = config.publicFilesPath;
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export default upload;

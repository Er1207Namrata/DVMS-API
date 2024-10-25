
import crypto from "crypto";
import multer from "multer";
import { extname, join ,dirname} from "path";
import { fileURLToPath } from 'url';

 const __filename = fileURLToPath(import.meta.url);
 //console.log(__filename);
 const __dirname = dirname(__filename);
 //console.log(__dirname);

const storage = multer.diskStorage({
  
  destination: join(__dirname, "../storage"),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString("hex") + extname(file.originalname));
    });
  },
});

export const upload = multer({ storage: storage });

export const validateResult = (array) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item.param]: item.msg,
    };
  }, {});
};


import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3';

const s3client = new S3Client();

const upload = multer({
    storage: multerS3({
      s3: s3client,
      bucket: 'user-profile-image-bucket',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname);
      }
    })
  });
export default upload;
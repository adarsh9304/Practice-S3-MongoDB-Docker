import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from "aws-sdk";
import { S3Client } from '@aws-sdk/client-s3'

// AWS S3 configuration
AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});


const s3 = new S3Client();

const upload = multer({
    storage: multerS3({
      s3: s3,
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
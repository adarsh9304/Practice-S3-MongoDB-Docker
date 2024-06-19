import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import User from "../model/User.js";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3client = new S3Client();

async function getObjectURL(bucketName, key) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const url = await getSignedUrl(s3client, command);
  return url;
}

const profilePresignedUrl = async (req, res) => {
  try {
    const { email } = req.body;
  
    const userImageDetail = await User.findOne({ email: email }).select({image:1}).lean();
    
    if (!userImageDetail || !userImageDetail.image) {
      return res.status(404).json({
        success: false,
        message: "User or image details not found",
      });
    }

    const { bucketName, key } = userImageDetail.image;

    if (!bucketName || !key) {
      return res.status(400).json({
        success: false,
        message: "Bucket name or key is missing",
      });
    }
    const presignedURL = await getObjectURL(bucketName, key);
    
    return res.status(200).json({
      success: true,
      presignedURL,
      message: "Presigned URL generated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error while generating presigned URL",
    });
  }
};

export { profilePresignedUrl };

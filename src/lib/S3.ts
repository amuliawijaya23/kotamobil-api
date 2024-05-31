import { S3Client } from '@aws-sdk/client-s3';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

import { randomChar } from './helpers';

export const bucketName = process.env.BUCKET_NAME || '';
const bucketRegion = process.env.BUCKET_REGION || '';
const accessKey = process.env.ACCESS_KEY || '';
const secretAccessKey = process.env.SECRET_ACCESS_KEY || '';

const S3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export const getCoverImagePresignedUrls = async (image: string) => {
  const getImageParam = { Bucket: bucketName, Key: image };
  const command = new GetObjectCommand(getImageParam);
  const imageUrl = await getSignedUrl(S3, command, { expiresIn: 24 * 60 * 60 });
  return { key: image, url: imageUrl };
};

export const getPresignedUrls = async (images: string[]) => {
  const imagesUrl = await Promise.all(
    images.map(async (image: string) => {
      const getImageParam = { Bucket: bucketName, Key: image };
      const command = new GetObjectCommand(getImageParam);
      const imageUrl = await getSignedUrl(S3, command, {
        expiresIn: 24 * 60 * 60,
      });
      return { key: image, url: imageUrl };
    }),
  );
  return imagesUrl;
};

export const uploadImages = async (
  images: Express.Multer.File[],
  id: string,
) => {
  const vehicleImages = [];
  for (const image of images) {
    const imageName = randomChar(16);

    const buffer = await sharp(image.buffer)
      .resize({ height: 1080, width: 1350, fit: 'contain' })
      .toBuffer();
    const params = {
      Bucket: bucketName,
      Key: `${id}/images/vehicles/${imageName}`,
      Body: buffer,
      ContentType: image.mimetype,
    };

    const command = new PutObjectCommand(params);
    await S3.send(command);
    vehicleImages.push(`${id}/images/vehicles/${imageName}`);
  }
  return vehicleImages;
};

export const removeImages = async (images: string) => {
  for (const image of images) {
    const params = {
      Bucket: bucketName,
      Key: image,
    };
    const command = new DeleteObjectCommand(params);
    await S3.send(command);
  }
};

export default S3;

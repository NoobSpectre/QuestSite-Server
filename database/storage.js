import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';
import { v4 as uuid } from 'uuid';
import User from '../models/User.js';

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadToS3 = async (username, { buffer, mimetype }) => {
  console.log('buffer', buffer);

  // searching the user and getting its avatar
  const { _id, avatar } = await User.findOne({ username });
  console.log('avatar', avatar);
  // if avatar is empty image is inserted, else image is updated
  const key = avatar || `${_id}/${uuid()}`;
  console.log('key', key);

  // resize the image for the avatar
  const _buffer = await sharp(buffer)
    .resize({
      height: 120,
      width: 120,
      fit: 'contain',
    })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: 'questsite-file-storage',
    Key: key,
    Body: _buffer,
    ContentType: mimetype,
  });

  try {
    await s3.send(command);
    return { key };
  } catch (error) {
    return { error };
  }
};

export const downloadFromS3 = async avatar => {
  const command = new GetObjectCommand({
    Bucket: 'questsite-file-storage',
    Key: avatar,
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 30 });
    return { url };
  } catch (error) {
    return { error };
  }
};

export const deleteFromS3 = async avatar => {
  const command = new DeleteObjectCommand({
    Bucket: 'questsite-file-storage',
    Key: avatar,
  });

  try {
    await s3.send(command);
    return { key: '' };
  } catch (error) {
    return { error };
  }
};

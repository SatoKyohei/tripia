import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "../lib/s3Client";

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function uploadImageToS3(file: Express.Multer.File) {
    const key = `uploads/${uuidv4()}-${file.originalname}`;
    await s3.send(
        new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            // ACL: "public-read",
        }),
    );

    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    },
});

/**
 * Upload un objet dans le bucket S3
 * @param {string} bucket - Nom du bucket
 * @param {string} key - Chemin/nom du fichier dans le bucket
 * @param {Buffer | Uint8Array | Blob | string} body - Contenu du fichier
 * @param {string} [contentType] - Type MIME du fichier
 */
export async function uploadToS3({ bucket = process.env.R2_BUCKET_NAME!, key, body, contentType }: { bucket?: string; key: string; body: Buffer | Uint8Array | Blob | string; contentType?: string }) {
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
    });
    return await s3.send(command);
}

/**
 * Supprime un objet du bucket S3
 * @param {string} bucket - Nom du bucket
 * @param {string} key - Chemin/nom du fichier dans le bucket
 */
export async function deleteFromS3({ bucket = process.env.R2_BUCKET_NAME!, key }: { bucket?: string; key: string }) {
    const command = new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
    });
    return await s3.send(command);
}
import { uploadToS3 } from "~~/server/utils/bucket"

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    const file = formData[0]

    if (!file) {
        throw createError({ statusCode: 400, statusMessage: 'File is required' })
    }

    // Upload the file to S3
    const result = await uploadToS3({
        key: `uploads/${file.filename}`,
        body: file.data,
        contentType: file.type,
    })

    return result
})
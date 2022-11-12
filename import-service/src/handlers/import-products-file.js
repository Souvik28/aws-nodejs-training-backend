import { S3 } from "aws-sdk";
import { HTTP_STATUS_CODES, HEADERS } from "../constants/request.js";

const s3 = new S3({
  region: "ap-south-1",
});
const BUCKET = "aws-training-product-import-bucket";
const FOLDER_PATH = "uploaded";

export const importProductsFile = async (event) => {
  try {
    const {
      queryStringParameters: { name },
    } = event;
    const params = {
      Bucket: BUCKET,
      Key: `${FOLDER_PATH}/${name}`,
      ContentType: "text/csv",
    };
    const signedUrl = await s3.getSignedUrlPromise("putObject", params);

    return {
      statusCode: HTTP_STATUS_CODES.OK,
      headers: HEADERS,
      body: JSON.stringify(signedUrl),
    };
  } catch (err) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      headers: HEADERS,
      body: JSON.stringify(err),
    };
  }
};

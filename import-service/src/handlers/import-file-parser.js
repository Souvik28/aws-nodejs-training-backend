import { S3 } from "aws-sdk";

const s3 = new S3({
  region: "ap-south-1",
});
const BUCKET = "aws-training-product-import-bucket";

export const importFileParser = async (event) => {
  try {
    const { Records } = event;
    for (const record of Records) {
      const {
        s3: {
          object: { key },
        },
      } = record;
      const response = await s3
        .getObject({
          Bucket: BUCKET,
          Key: key,
        })
        .promise();

      const result = response.Body.toString("utf-8");
      console.log("Test Result ", result);
    }
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

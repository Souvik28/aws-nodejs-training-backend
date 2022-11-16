import { S3 } from "aws-sdk";

const s3 = new S3({
  region: "ap-south-1",
});
const sqs = new SQS({
  region: "ap-south-1",
});
const BUCKET = "aws-training-product-import-bucket";

const parseCsvContent = (content) => {
  const productsRows = content.split(/\r?\n|\r/);
  const products = productsRows
    .filter((row) => row.length > 0)
    .map((productRow) => {
      const productProperties = productRow.split(",");
      return {
        description: productProperties[0],
        price: +productProperties[1],
        title: productProperties[2],
        count: +productProperties[3],
      };
    });
  return products;
};

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

      const products = parseCsvContent(response.Body.toString("utf-8"));
      const messages = products.map((product) => {
        return sqs
          .sendMessage({
            MessageBody: JSON.stringify(product),
            QueueUrl:
              "https://sqs.ap-south-1.amazonaws.com/915264841307/create-product-queue",
          })
          .promise();
      });
      return Promise.all(messages)
        .then((data) =>
          console.log("importFileParser message sent:", JSON.stringify(data))
        )
        .catch((err) =>
          console.log(
            "importFileParser message send error:",
            JSON.stringify(err)
          )
        );
    }
  } catch (err) {
    console.log(JSON.stringify(err));
    return err;
  }
};

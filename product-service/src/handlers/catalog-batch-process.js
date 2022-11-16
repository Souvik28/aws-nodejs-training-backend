import { SNS } from "aws-sdk";
import { createProduct } from "./create-product.js";
import { HTTP_STATUS_CODES } from "../constants/request.js";

const sns = new SNS({
  region: "ap-south-1",
});

export const catalogBatchProcess = async (event) => {
  console.log("catalogBatchProcess lambda event:", JSON.stringify(event));
  try {
    const requests = event.Records.map((record) => {
      return createProduct({
        body: record.body,
      }).then(async (result) => {
        if (result.statusCode !== HTTP_STATUS_CODES.OK) {
          console.log("catalogBatchProcess failed to createProduct:", result);
          return;
        }
        await sns
          .publish({
            Subject: "Product created",
            Message: `The product with properties ${record.body} successfully created`,
            TopicArn: "arn:aws:sns:eu-west-1:436554558729:create-product-topic",
          })
          .promise();
        console.log("catalogBatchProcess createProduct result:", result);
      });
    });
    return Promise.all(requests)
      .then((data) =>
        console.log(
          "catalogBatchProcess products created:",
          JSON.stringify(data)
        )
      )
      .catch((err) =>
        console.log(
          "catalogBatchProcess products create error:",
          JSON.stringify(err)
        )
      );
  } catch (err) {
    console.log("catalogBatchProcess error:", JSON.stringify(err));
    return err;
  }
};

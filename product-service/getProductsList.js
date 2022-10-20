const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const paramsProducts = {
  TableName: process.env.PRODUCTS_TABLE,
};

module.exports.getProductsList = async (event, context, callback) => {
  try {
    const products = await dynamoDb.scan(paramsProducts).promise();

    const combinedResult = await Promise.all(
      products.Items.map(async (product) => {
        const paramStocks = {
          TableName: process.env.STOCKS_TABLE,
          Key: {
            product_id: product.id,
          },
        };
        try {
          const productCount = await dynamoDb.get(paramStocks).promise();
          return {
            ...product,
            count: productCount.Item.count,
          };
        } catch (err) {
          throwError(err);
          return;
        }
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(combinedResult),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the products",
    };
  }
};

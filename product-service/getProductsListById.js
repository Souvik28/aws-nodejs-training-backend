"use strict";
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getProductsById = async (event) => {
  const paramsProducts = {
    TableName: process.env.PRODUCTS_TABLE,
    Key: {
      id: event.pathParameters.productId,
    },
  };
  try {
    const product = await dynamoDb.get(paramsProducts).promise();
    const paramStocks = {
      TableName: process.env.STOCKS_TABLE,
      Key: {
        product_id: product.Item.id,
      },
    };
    let finalObj = {};
    try {
      const productCount = await dynamoDb.get(paramStocks).promise();
      finalObj = {
        ...product.Item,
        count: productCount.Item.count,
      };
      return {
        statusCode: 200,
        body: JSON.stringify(finalObj),
      };
    } catch (err) {
      throwError(err);
      return;
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the product for the given Id",
    };
  }
};

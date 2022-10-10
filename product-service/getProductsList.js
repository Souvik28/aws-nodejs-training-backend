"use strict";
const data = require("./assets/data.json");

module.exports.getProductsList = async (event) => {
  try {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log("error", e);
  }
};
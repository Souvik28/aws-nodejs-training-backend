import * as AWS from 'aws-sdk';

import { ProductNotFoundException } from '../exceptions/product-not-found.js';
import { PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME, PRODUCT_NOT_FOUND_MESSAGE } from '../constants/db.js';
import { newGuid } from '../utils/guid.js'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

function getStocksMap(stocks) {
    return stocks.reduce((map, stock) => {
        map[stock.product_id] = stock.count;
        return map;
    }, {})
}

export async function getAll() {
    const [ products, stocks ] = await Promise.all([
        dynamoDB.scan({
            TableName: PRODUCTS_TABLE_NAME
        })
            .promise()
            .then(data => data.Items),
        dynamoDB.scan({
            TableName: STOCKS_TABLE_NAME
        })
            .promise()
            .then(data => data.Items)
    ]);
    const stocksMap = getStocksMap(stocks);
    return products.map(product => {
        const count = stocksMap[product.id];
        return Object.assign(product, { count });
    });
}

export async function getById(productId) {
    const products = await getAll();
    const product = products.find(product => product.id === productId);
    validateProduct(product);
    return Promise.resolve(product);
}

export async function create(payload) {
    const newProductId = newGuid();
    const productsDbParams = {
        TableName: PRODUCTS_TABLE_NAME,
        Item: {
            description: payload.description,
            id: newProductId,
            price: payload.price,
            title: payload.title
        }
    };
    const stocksDbParams = {
        TableName: STOCKS_TABLE_NAME,
        Item: {
            product_id: newProductId,
            count: payload.count
        }
    };

    return dynamoDB.transactWrite({
        TransactItems: [
            {
                Put: productsDbParams
            },
            {
                Put: stocksDbParams
            }
        ]
    })
        .promise()
        .then(result => result)
        .catch(err => err);
}

function validateProduct(product) {
    if (!product) {
        throw new ProductNotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }
}
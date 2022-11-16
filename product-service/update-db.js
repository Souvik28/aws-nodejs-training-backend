import { spawnSync } from 'child_process';
import { products } from './src/constants/products.js';
import { stocks } from './src/constants/stocks.js';

const typesMapJSAWS = {
    'string': 'S',
    'number': 'N'
}

function getItemAWSString(item) {
    const itemAWS = {};
    for (const [ key, value ] of Object.entries(item)) {
        const jsValueType = typeof value;
        const awsValueType = typesMapJSAWS[jsValueType];
        itemAWS[key] = {
            [awsValueType]: `${value}`
        }
    }
    return JSON.stringify(itemAWS);
}

function putItemToTable(tableName, awsItem) {
    const { stderr } = spawnSync('aws', [
        'dynamodb',
        'put-item',
        '--table-name',
        tableName,
        '--item',
        awsItem
    ]);
    const errString = stderr.toString();

    if (errString) {
        console.log('PUT to db failed:', errString);
    }
}

function putProductToDB(product) {
    const productAWSString = getItemAWSString(product);
    putItemToTable('products', productAWSString);
}

function putStockToDB(stock) {
    const stockAWSString = getItemAWSString(stock);
    putItemToTable('stocks', stockAWSString);
}

products.forEach(putProductToDB);
stocks.forEach(putStockToDB);

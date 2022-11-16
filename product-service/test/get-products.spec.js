import assert from 'assert';
import { HTTP_STATUS_CODES } from '../src/constants/request.js';
import { products } from '../src/constants/products.js';
import { getProducts } from '../src/handlers/get-products.js';

describe('getProducts handler', () => {
    it('should return the list of products', async () => {
        const expectedResponseBody = JSON.stringify(products);
        const expectedResponseStatusCode = HTTP_STATUS_CODES.OK;

        const actual = await getProducts();

        assert.strictEqual(actual.body, expectedResponseBody);
        assert.strictEqual(actual.statusCode, expectedResponseStatusCode);
    });
});

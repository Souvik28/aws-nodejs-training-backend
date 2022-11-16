import assert from 'assert';
import { HTTP_STATUS_CODES } from '../src/constants/request.js';
import { products } from '../src/constants/products.js';
import { getProductById } from '../src/handlers/get-product-by-id.js';

describe('getProductById handler', () => {
    it('should return the product by id', async () => {
        const testProduct = products[0];
        const testProductId = testProduct.id;
        const expectedResponseBody = JSON.stringify(testProduct);
        const expectedResponseStatusCode = HTTP_STATUS_CODES.OK;

        const actual = await getProductById({
            pathParameters: {
                productId: testProductId
            }
        });

        assert.strictEqual(actual.body, expectedResponseBody);
        assert.strictEqual(actual.statusCode, expectedResponseStatusCode);
    });

    it('should return 404 error if product with specified id not found', async () => {
        const testProductId = 'testId';
        const expectedResponseStatusCode = HTTP_STATUS_CODES.NOT_FOUND;

        const actual = await getProductById({
            pathParameters: {
                productId: testProductId
            }
        });

        assert.strictEqual(actual.statusCode, expectedResponseStatusCode);
    });
});

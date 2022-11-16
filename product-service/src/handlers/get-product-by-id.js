import { getById } from '../db/products.js';
import { HTTP_STATUS_CODES, HEADERS } from '../constants/request.js';

export const getProductById = async (event) => {
	console.log('getProductById lambda event:', JSON.stringify(event));
	try {
        const { pathParameters: { productId } } = event;
        const product = await getById(productId);
		return {
            statusCode: HTTP_STATUS_CODES.OK,
            headers: HEADERS,
			body: JSON.stringify(product)
		};
	} catch (err) {
        const { statusCode } = err;
		return {
            statusCode: statusCode || HTTP_STATUS_CODES.BAD_REQUEST,
            headers: HEADERS,
			body: JSON.stringify(err)
		};
	}
};

import { getAll } from '../db/products.js';
import { HTTP_STATUS_CODES, HEADERS } from '../constants/request.js';

export const getProducts = async (event) => {
	console.log('getProducts lambda event:', JSON.stringify(event));
	try {
        const products = await getAll();
		return {
            statusCode: HTTP_STATUS_CODES.OK,
            headers: HEADERS,
			body: JSON.stringify(products)
		};
	} catch (err) {
		return {
            statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
            headers: HEADERS,
			body: JSON.stringify(err)
		};
	}
};

import { create } from '../db/products.js';
import { HTTP_STATUS_CODES, HEADERS } from '../constants/request.js';
import { InvalidProductDataException } from '../exceptions/invalid-product-data.js';

function validatePrice(price) {
    if (typeof price !== 'number' || price <= 0) {
        throw new InvalidProductDataException('Invalid product price');
    }
}

function validateCount(count) {
    if (typeof count !== 'number' || count <= 0) {
        throw new InvalidProductDataException('Invalid product count');
    }
}

function validateTitle(title) {
    if (typeof title !== 'string' || title.length === 0) {
        throw new InvalidProductDataException('Invalid product title');
    }
}

function validateDescription(description) {
    if (typeof description !== 'string' || description.length === 0) {
        throw new InvalidProductDataException('Invalid product description');
    }
}

function validatePayload(payload) {
    const {
        price,
        title,
        count,
        description
    } = payload;
    validatePrice(price);
    validateCount(count);
    validateTitle(title);
    validateDescription(description);
}

export const createProduct = async (event) => {
    console.log('createProduct lambda event:', JSON.stringify(event));
	try {
		const payload = JSON.parse(event.body);
        validatePayload(payload);
		const product = await create(payload);
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

import { HTTP_STATUS_CODES } from '../constants/request.js';

export class ProductNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
        this.serverMessage = message;
    }
}
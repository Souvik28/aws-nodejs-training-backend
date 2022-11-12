import { HTTP_STATUS_CODES } from '../constants/request.js';

export class InvalidProductDataException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
        this.serverMessage = message;
    }
}
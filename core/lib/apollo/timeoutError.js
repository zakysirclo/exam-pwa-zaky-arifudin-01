export default class TimeoutError extends Error {
    constructor(message, timeout, statusCode = 408) {
        super(message);
        this.timeout = timeout;
        this.statusCode = statusCode;
    }
}

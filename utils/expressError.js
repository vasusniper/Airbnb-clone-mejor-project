class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message); // Call the parent class constructor with the error message
        this.statusCode = statusCode; // Custom status code property
        this.message = message; // Custom message property
    }
}

module.exports = ExpressError; // Export the class

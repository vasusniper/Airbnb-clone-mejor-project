class MyError extends Error {
    constructor(status, message) {
        super(message); // Call the parent class constructor with the error message
        this.status = status; // Custom status property
        this.message = message; // Custom message property
    }
}

module.exports = MyError; // Export the class

module.exports = wrapAsync = (fn) => {
    return (req, res, next) => {
        // Call the async function and catch any errors
        fn(req, res, next).catch(next);
    };
};

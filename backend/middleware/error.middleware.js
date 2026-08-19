const errorHandler = (err, req, res, next) => {
    console.error(err); // good for debugging

    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Something went wrong",
    });
};

module.exports = errorHandler;

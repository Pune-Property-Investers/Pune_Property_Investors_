/**
 * MVC View Layer (JSON Response Formatter)
 * Transforms model data and generates structured, consistent JSON responses for client consumption.
 */

export const renderSuccess = (res, data = null, message = "Success", statusCode = 200, meta = null) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta })
    });
};

export const renderError = (res, message = "An error occurred", statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
};

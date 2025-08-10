export const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err);

    // Default error
    let error = {
        status: 500,
        message: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.status = 400;
        error.message = 'Validation Error';
        error.details = err.message;
    } else if (err.name === 'UnauthorizedError') {
        error.status = 401;
        error.message = 'Unauthorized';
    } else if (err.name === 'ForbiddenError') {
        error.status = 403;
        error.message = 'Forbidden';
    } else if (err.name === 'NotFoundError') {
        error.status = 404;
        error.message = 'Not Found';
    } else if (err.code === 'LIMIT_FILE_SIZE') {
        error.status = 413;
        error.message = 'File too large';
    }

    // API requests get JSON response
    if (req.path.startsWith('/api/')) {
        return res.status(error.status).json({
            error: error.message,
            details: error.details
        });
    }

    // Web requests get error page
    res.status(error.status).render('errors/error', {
        title: `Error ${error.status}`,
        status: error.status,
        message: error.message,
        details: error.details
    });
};

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message = 'Unauthorized') {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends Error {
    constructor(message = 'Forbidden') {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends Error {
    constructor(message = 'Not Found') {
        super(message);
        this.name = 'NotFoundError';
    }
}

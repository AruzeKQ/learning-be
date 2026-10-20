export const validateMiddleware = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false }); // validate req.body
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({
                message: "Dữ liệu không hợp lệ!",
                error: errorMessage
            });
        }

        req.body = value;
        next();
    }
}
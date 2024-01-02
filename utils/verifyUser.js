import { errorHandler } from "../middlewares/errorHandler";
import { jwt } from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'))

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        next(error)
    }

}
import jwt from "express-jwt";
import { Request } from "express";

const getToken = (req: Request): string | null => {
    const { body: {token} } = req;

    if (token) return token;

    return null;
};

const auth = {
    required: jwt({
        algorithms: ['HS256'],
        secret: <string>process.env.JWT_SECRET,
        userProperty: 'payload',
        getToken: getToken
    }),
    optional: jwt({
        algorithms: ['HS256'],
        secret: <string>process.env.JWT_SECRET,
        userProperty: 'payload',
        getToken: getToken,
        credentialsRequired: false
    }),
};

export default auth;

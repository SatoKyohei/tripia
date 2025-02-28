import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export interface AuthenticateRequest extends Request {
    user?: { userId: string };
}

export const authenticateToken = (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access Token required" });
    }
    // if (tokenBlackList.has(token)) {
    //     return res.status(403).json({ error: "Token is no longer valid" });
    // }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired" });
            }
            return res.status(403).json({ error: "Invalid Token" });
        }
        req.user = user as { userId: string };
        next();
    });
};

export const expressAuthentication = async (
    request: Request,
    securityName: string,
    _scopes?: string[],
): Promise<any> => {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];
        const token = authHeader?.split(" ")[1];
        if (!token) {
            throw new Error("No token provided");
        }
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    }
    throw new Error("Unsupported security name");
};

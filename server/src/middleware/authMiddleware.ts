import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken'

interface jwtPayload {
    id: number
    iat: number
    exp: number
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    const secret = process.env.SECRET as string

    try {
        const data = jwt.verify(token, secret)
        const { id } = data as jwtPayload

        req.userId = id;

        return next()
        
    } catch {
        return res.sendStatus(401)
    }
}
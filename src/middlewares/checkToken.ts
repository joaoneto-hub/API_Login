import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function checkToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Access denied'});
    }

    try{
        const secret = process.env.SECRET;

        jwt.verify(token, secret as string);

        next();
    }catch(error){
        return res.status(401).json({message: 'Access denied'});

    }
}

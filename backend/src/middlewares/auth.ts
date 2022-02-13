import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { HttpException } from '../exceptions/HttpException';

interface DataStoredInToken {
    id: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.header('Authorization')?.split('Bearer ')[1];
  
      if (Authorization) {
        const secretKey: string = process.env.SECRET_KEY || 'secretKey';
        const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
        const userId = verificationResponse.id;
  
        const users = new PrismaClient().user;
        const findUser = await users.findUnique({ where: { id: userId } });
  
        if (findUser) {
          req.user = findUser.id;
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };

export default authMiddleware;
import jwt from'jsonwebtoken';
import TokenData from '../interfaces/TokenData';

export default function createToken(id: string) : TokenData{

    const secretKey = process.env.SECRET_KEY || 'secretKey';

    const expiresIn: number = 60 * 60 * 24;

    return { expiresIn, token: jwt.sign({id}, secretKey, {expiresIn}) };
}
import { Request, Response } from 'express';
import { User, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import CreateUserDto from '../dtos/CreateUserDTO';
import LoginDTO from '../dtos/LoginDTO';
import createToken from '../utils/createToken';

export default class UserController{

    async create(request: Request, response: Response){
        try {
            const userData: CreateUserDto = request.body;

            const userRepository = new PrismaClient().user;

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const createUserData: User = await userRepository.create({ data: { ...userData, password: hashedPassword}});

            const tokenData = createToken(createUserData.id)
      
            response.status(201).json({ data: tokenData, message: 'created' });
          } catch (error) {
            console.log(error);
            response.sendStatus(500)
          }
    }

    async login(request: Request, response: Response){
      try {
          const {email, password}: LoginDTO = request.body;

          const userRepository = new PrismaClient().user;

          const user: User | null = await userRepository.findUnique({ where: { email } });

          if(user && await bcrypt.compare(password, user.password)){
            const tokenData = createToken(user.id)
    
            response.status(201).json({ data: tokenData, message: 'logged' });
          }else{
            response.sendStatus(401)
          }  
        } catch (error) {
          console.log(error);
          response.sendStatus(500)
      }
    }
}
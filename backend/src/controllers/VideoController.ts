import { Request, Response } from 'express';
import { Video, PrismaClient } from '@prisma/client';
import CreateVideoDTO from '../dtos/CreateVideoDTO';

export default class VideoController{

    async create(request: Request, response: Response){
        try {
            const videoData: CreateVideoDTO = request.body;

            const videoRepository = new PrismaClient().video;

            const createVideoData: Video = await videoRepository.create({ data: { ...videoData, authorId:request.user } });
      
            response.status(201).json({ data: {id: createVideoData.id}, message: 'created' });
          } catch (error) {
            console.log(error);
            response.sendStatus(500)
          }
    }
}
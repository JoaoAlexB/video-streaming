import { Request, Response } from 'express';
import { Video, PrismaClient } from '@prisma/client';
import { getVideoDurationInSeconds } from 'get-video-duration'

export default class UploadController{

    async video(request: Request, response: Response){
        try {
            const videoRepository = new PrismaClient().video;

            const { videoId } = request.params;

            const { file } = request;

            if(file){

                const duration = Math.round(await getVideoDurationInSeconds(file.path));

                await videoRepository.update({
                    where: {
                        id: videoId
                    },
                    data:{
                        fileName: file.filename,
                        duration,
                        published: true
                    }
                });

                response.status(200).json({ message: 'uploaded' });

            }else {
                response.sendStatus(500)
            }
          } catch (error) {
            console.log(error);
            response.sendStatus(500)
          }
    }

    async thumbnail(request: Request, response: Response){
        try {
            const videoRepository = new PrismaClient().video;

            const { videoId } = request.params;

            const { file } = request;

            if(file){

                await videoRepository.update({
                    where: {
                        id: videoId
                    },
                    data:{
                        thumbnail: file.filename,
                    }
                });

                response.status(200).json({ message: 'uploaded' });

            }else {
                response.sendStatus(500)
            }
          } catch (error) {
            console.log(error);
            response.sendStatus(500)
          }
    }
}
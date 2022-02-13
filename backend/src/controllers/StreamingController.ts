import { Request, Response } from 'express';
import { Video, PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

export default class StreamingController{

    private static videoPath = path.resolve(__dirname, '..', '..', 'assets', 'videos');

    async index (request: Request, response: Response){
        
        const {id} = request.params;

        const videos = new PrismaClient().video;

        const video: Video | null = await videos.findUnique({where: { id }});

        if(video){
            const videoFile = `${StreamingController.videoPath}/${video.fileName}`;

            fs.stat(videoFile, (error, stats) =>{
                if (error) {
                    console.log(error);
                    return response.status(404).end('Video not found');
                }
    
                // Variáveis necessárias para montar o chunk header corretamente
                const { range } = request.headers;
                const { size } = stats;
                const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
                const end = size - 1;
                const chunkSize = (end - start) + 1;
                
                // Definindo headers de chunk
                response.set({
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
                });
    
                // É importante usar status 206 - Partial Content para o streaming funcionar
                response.status(206);
    
                // Utilizando ReadStream do Node.js
                // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
                const stream = fs.createReadStream(videoFile, { start, end });
    
                stream.on('open', () => stream.pipe(response));
                stream.on('error', (streamErr) => response.end(streamErr));
    
            });
        } else {
            return response.status(404).send({error: 'Video not found'});
        }
    }
}
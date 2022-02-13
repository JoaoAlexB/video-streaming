import express from 'express';
import VideoController from '../../controllers/VideoController';
import authMiddleware from '../../middlewares/auth';

const videoController = new VideoController();

const VideoRoutes = express.Router();

VideoRoutes.post('/videos', authMiddleware, videoController.create);

export default VideoRoutes;
import express from 'express';
import UploadController from '../../controllers/UploadController';
import authMiddleware from '../../middlewares/auth';
import uploadVideoConfig from '../../config/upload/video';
import uploadThumbnailConfig from '../../config/upload/thumbnail';
import multer from 'multer';

const uploadController = new UploadController();

const uploadVideoMiddleware = multer(uploadVideoConfig);
const uploadThumbnailMiddleware = multer(uploadThumbnailConfig);

const UploadRoutes = express.Router();

UploadRoutes.post('/upload/video/:videoId', authMiddleware, uploadVideoMiddleware.single('file'), uploadController.video);

UploadRoutes.post('/upload/thumbnail/:videoId', authMiddleware, uploadThumbnailMiddleware.single('file'), uploadController.thumbnail);

export default UploadRoutes;
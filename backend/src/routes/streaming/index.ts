import express from 'express';
import StreamingController from '../../controllers/StreamingController';

const streamingController = new StreamingController();

const StreamingRoutes = express.Router();

StreamingRoutes.get('/streaming/:id', streamingController.index);

export default StreamingRoutes;
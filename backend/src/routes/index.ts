import express from 'express';

import StreamingRoutes from './streaming';
import UploadRoutes from './upload';
import UserRoutes from './user';
import VideoRoutes from './video';

const MainRouter = express.Router();

MainRouter.use(StreamingRoutes)
MainRouter.use(UserRoutes)
MainRouter.use(VideoRoutes)
MainRouter.use(UploadRoutes)


export default MainRouter;
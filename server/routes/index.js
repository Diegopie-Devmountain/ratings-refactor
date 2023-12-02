import { Router } from "express";

import movieRouter from "./movie.routes.js";
import authRoutes from "../auth.routes.js";

const router = Router();

router.use('/api/movies', movieRouter);

router.use('', authRoutes);

export default router;

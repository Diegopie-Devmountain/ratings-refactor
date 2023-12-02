import { Router } from "express";

import movieRouter from "./movie.routes.js";

const router = Router();

router.use('/api/movies', movieRouter);

export default router;

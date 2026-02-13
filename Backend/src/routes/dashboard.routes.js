import { Router } from "express";
import { getDashboardCounts } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/fetch/counts').get(verifyJWT, getDashboardCounts);

export default router;
import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlwares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/onboarding", protectedRoute, onboard);

router.get("/me", protectedRoute, (req, res) => {
    res.status(200).json({ 
        success: true,
        user : req.user
    });
});

export default router;
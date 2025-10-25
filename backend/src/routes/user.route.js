import express from 'express';
import { protectedRoute } from '../middlwares/auth.middleware.js';
import { getRecommendedUsers, getUserFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests } from '../controllers/user.controller.js';

const router = express.Router();

//to apply auth middleware to all user routes
router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getUserFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;
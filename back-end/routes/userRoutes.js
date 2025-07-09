import express from 'express';
import userController from '../usersController/userController.js';
import { verifyToken } from '../components/jsonwebtoken.js';
const router = express.Router();



router.post(`/init-auth`,userController.initAuth);


router.post(`/verify-auth`,userController.verifyAuth);



router.get(`/searchUser/:username`,userController.searchUser);

router.post(`/add-friend-encrypted`,verifyToken, userController.addFriendEncrypted);

router.post(`/add-friend`,verifyToken, userController.addFriend);

router.get(`/get-friends`, verifyToken, userController.getFriendsList);
export default router

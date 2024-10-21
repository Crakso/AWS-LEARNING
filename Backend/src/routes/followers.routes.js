import { Router } from "express";
import { UserAuthentication } from "../middlewares/auth.middleware.js";
import {
  userFollowings,
  getUserFollowing,
  recommendedUserFollowing,
} from "../controller/followers.controller.js";

const router = Router();
router.use(UserAuthentication); // Apply verifyJWT middleware to all routes in this file

router.route("/accounts/recommended-users").get(recommendedUserFollowing);
router
  .route("/accounts/follow/:followingId")
  .get(getUserFollowing)
  .post(userFollowings);

export default router;

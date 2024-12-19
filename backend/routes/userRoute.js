import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  generateResponse,
  generatePdf,
} from "../controllers/userController.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/generateresponse").post(generateResponse);
// .post(isAuthenticatedUser, createPdf);

router.route("/generatepdf").post(generatePdf);

// google authentication
// router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

// router.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/register' }),
//     (req, res) => {
//     res.redirect('/login')
//     }
// )

export default router;

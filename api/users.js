import express from "express";
const router = express.Router();
import requireBody from "#middleware/requireBody";
import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import { createToken } from "#utils/jwt";
export default router;

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);
      const token = createToken({ id: user.id });
      res.status(201).send(token);
    } catch (err) {
      next(err);
    }
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");
    const token = createToken({ id: user.id });
    res.status(200).send(token);
  });

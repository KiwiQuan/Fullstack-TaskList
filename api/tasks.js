import express from "express";
const router = express.Router();
import {
  getTasks,
  createTask,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} from "#db/queries/tasks";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
export default router;

router.use(requireUser);

router
  .route("/")
  .post(requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const task = await createTask(title, done, req.user.id);
    res.status(201).send(task);
  })
  .get(async (req, res) => {
    const tasks = await getTasks(req.user.id);
    res.status(200).send(tasks);
  });
router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);

  if (!task) return res.status(404).send("Task not found.");
  if (req.user.id !== task.user_id) {
    return res.status(403).send("You are not authorized to delete this task.");
  }
  req.task = task;
  next();
});

router
  .route("/:id")
  .delete(async (req, res) => {
    await deleteTaskById(req.task.id);
    res.status(204).send();
  })
  .put(requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const task = await updateTaskById(req.task.id, title, done);
    res.status(200).send(task);
  });

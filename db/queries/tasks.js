import db from "#db/client";
import bcrypt from "bcrypt";

export async function createTask(title, done, userId) {
  const sql = `
        INSERT INTO tasks
                (title, done, user_id)
        VALUES
                ($1, $2, $3)
        RETURNING *
        `;
  const {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}

export async function getTasks(userId) {
  const sql = `
        SELECT *
        FROM tasks
        WHERE user_id = $1
        `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}

export async function getTaskById(id) {
  const sql = `
        SELECT *
        FROM tasks
        WHERE id = $1
        `;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

export async function deleteTaskById(id) {
  const sql = `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *
        `;
  const {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

export async function updateTaskById(id, title, done) {
  const sql = `
        UPDATE tasks
        SET title = $2, done = $3
        WHERE id = $1
        RETURNING *
        `;
  const {
    rows: [task],
  } = await db.query(sql, [id, title, done]);
  return task;
}

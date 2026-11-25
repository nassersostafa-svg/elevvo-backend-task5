import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Users
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.status(201).json(user);
  } catch {
    res.status(400).json({ error: "Could not create user (email must be unique)" });
  }
});

app.get("/users", async (_req, res) => {
  res.json(await prisma.user.findMany({ include: { posts: true } }));
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    include: { posts: true },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { name, email },
    });
    res.json(user);
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.post.deleteMany({ where: { authorId: Number(req.params.id) } });
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

// Posts
app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({ data: { title, content, authorId } });
    res.status(201).json(post);
  } catch {
    res.status(400).json({ error: "Could not create post (check authorId)" });
  }
});

app.get("/posts", async (_req, res) => {
  res.json(await prisma.post.findMany({ include: { author: true } }));
});

app.delete("/posts/:id", async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch {
    res.status(404).json({ error: "Post not found" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: Number(req.query.age),
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(200).json({ message: "Nenhum usuário encontrado" });
  }
});

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res
    .status(201)
    .json({ message: "Usuário cadastrado com sucesso.", data: req.body });
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res
    .status(201)
    .json({ message: "Usuário editado com sucesso.", data: req.body });
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(201).json({ message: "Usuário deletado com sucesso." });
});

app.listen(5001);

import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

// La clave de MVC es que cada parte es una caja negra para la otra, no saben lo que hay dentro de la otra
// A esto le quedaria emvolver todo en un try catch para el manejo de errores, luego lo haremos con un middleware

export const moviesRouter = Router();
// Para el router es un misterio lo que ocurre dentro del controlador
moviesRouter.get("/", MovieController.getAll);

moviesRouter.get("/:id", MovieController.getById);

moviesRouter.post("/", MovieController.create);

moviesRouter.delete("/:id", MovieController.delete);

moviesRouter.patch("/:id", MovieController.update);

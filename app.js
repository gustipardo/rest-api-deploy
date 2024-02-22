// esta clase parte de la clase 3 ahi hay comentarios de todo el codigo de la clase 3

import express, { json } from "express";

// Como leer un JSON con ESModules, 1ra forma
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

// Como leer un JSON en ESModules recomendado

// import { corsMiddleware } from "./middleware/cors";
import { moviesRouter } from "./routes/movies.js";

// import { createRequire } from "node:module";
// const require = createRequire(import.meta.url); // creamos nuestro require del archivo actual
// const movies = require("./movies.json"); // Este require de forma nativa ya es capaz de comerse los json (no se necesita el JSON.parse que consume mas recursos)

const app = express();
// app.use(corsMiddleware());
app.use(json());

app.disable("x-powered-by");

app.use("/movies", moviesRouter);

// El puerto generalmente es asignado automaticamente por el hosting mediante la variable de entorno
const PORT = process.env.PORT ?? 1234;
// Las variables de entorno siempre en MAYUSCULAS
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

// Sistemas de modulos de NodeJs

// commonJS clásico require, module.exports

// ESModules moderno y recomendado. Parte de la especificación de JS. import/export
// En package.json poner type: module

// MVC es un patron de arquitectura que va muy bien con Express, muy utilizado en web y mobile
// Module, Visual, Control

// Te obliga a separar la app en tres componentes interconectados

// Modelo: Logina de negocio, acceder a la DB, la actualizacion de datos.
// Controlador: Intermediario entre modelo y Vista, comunica la informacion de entrada al modulo ségun sea necesario
// Visual: Representar la intefaz para el usuario de las funcionalidades. Donde se crean las entradas.

// Lo visual no va directamente al Modelo nunca, simpre esta de intermediario el Controlador

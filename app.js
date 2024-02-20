// esta clase parte de la clase 3 ahi hay comentarios de todo el codigo de la clase 3

const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const cors = require("cors");
const { validateMovie, validatePartialMovie } = require("./scheme/movies");
const app = express();
// app.use(cors()) // SI a TODO, Esto es un middleware que pone todo por defecto con allow origin * es decir que permite todos lo métodos a todos los origenes, sirve para comodidad pero es peligroso, se instala con npm i cors -E
app.use(express.json());

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

app.get("/", () => {
  console.log({ message: "hola mundo" });
});

const ACCEPTED_ORIGINS = ["http://localhost:8080", "http://localhost:8081"];

app.get("/movies", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLocaleLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ messege: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);
  const { title, genre, year, director, duration, rate, poster } = result;

  if (result.error) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

app.delete("/movies/:id", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  movies.splice(movieIndex, 1);

  return res.json({ message: "movie deleted" });
});

app.options("/movies/:id", (req, res) => {
  const origin = req.header("origin");
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  }
  res.send(200);
});

// El puerto generalmente es asignado automaticamente por el hosting mediante la variable de entorno
const PORT = process.env.PORT ?? 1234;
// Las variables de entorno siempre en MAYUSCULAS
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

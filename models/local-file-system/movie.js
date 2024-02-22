import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");

//  Logica de negocio, utilizamos una clase por el contrato y porque con typescript vamos a poder tiparla facilemente.
//  Como el modelo puede tratar tanto con datos sincronos como asincronos nosotros debemos hacer todas las funciones con promesas para que funcione en ambos casos.
//  Igual generalemente supongo que se usan bases de datos por lo que seran asincronos
// Hacemos que todos tengan el mismo contrato, todos devuelven una promesa
export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      // info de como se filtan los datos y como se recuperan
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }
  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };
    movies.push(newMovie);
    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;
    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }
}

import { MovieModel } from "../models/mongodb/movie.js"; // Cuando cambiamos de modelo solo deberemos cambiar esta linea de codigo en el controlador, esto porque el se respetan los contratos
import { validateMovie, validatePartialMovie } from "../scheme/movies.js";

// La arquitectura de software es importante para crear un producto escalable, mantenible y funcionales

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre }); // No sabemos como se filtra, esto pertenece al models
    res.json(movies);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ messege: "Movie not found" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }
    const newMovie = await MovieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.json({ message: "movie deleted" });
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updatedMovie = await MovieModel.update({ id, input: result.data });

    return res.json(updatedMovie);
  }
}

// Validaciones hay en todas las capas pero de diferentes tipos

// Controlador: Validaciones de formato y Coherencia, validar el input del usuario antes de enviarlo al usuario

// Vista: Estas son las validaciones de UX por ejemplo mostrar que un campo es requerido

// Modelo: Validaciones regla de negocio, coherencia de datos, persistencia de datos (base de datos) por ejemplo el tipo de dato a ingresar en la base de datos
// verificacion si una id, email esta repetida, esto se hace en el modelo.

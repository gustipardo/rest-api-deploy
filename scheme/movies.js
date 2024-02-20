const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().min(0).int(),
  rate: z.number().min(0).max(10).default(0), // Valor por defecto para que no sea requerido
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }), //Tiene incluso endsWith()
  genre: z.array(
    z.enum(
      [
        "Action",
        "Adventure",
        "Sci-Fi",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Thriller",
      ],
      {
        required_error: "Movie genre is required",
        invalid_type_error: "Movie genre must be an array of enum Genre",
      }
    )
  ),
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object); // Hace que todas las propiedades sean opcionales
}

module.exports = {
  validateMovie,
  validatePartialMovie,
};

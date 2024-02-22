import cors from "cors";

// Configurars CORS desde fuera
const ACCEPTED_ORIGINS = ["http://localhost:8080"];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  // Creamos una funcion que al ejecutarla devuelva la funcionalidad del cors
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  });

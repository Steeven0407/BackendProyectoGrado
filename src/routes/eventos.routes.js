import { Router } from "express";
import { crearEvento, ObtenerEventos  } from "../controllers/eventos.controllers.js";
import { ValidarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/eventos", crearEvento);

router.get("/eventosLobby", ObtenerEventos);



export default router;
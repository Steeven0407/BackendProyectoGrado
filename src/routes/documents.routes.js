import { Router } from "express";
import { crearDocumento, ObtenerDocumentosLobby } from "../controllers/documents.controllers.js";
import { ValidarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/documentos", crearDocumento);

router.get("/documentosLobby", ObtenerDocumentosLobby);





export default router;
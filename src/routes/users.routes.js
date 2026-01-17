import { Router } from "express";
import { BuscarTodosLosUsuarios, BuscarUsusarioPorCodigo, CrearUsuario, EliminarUsuario, ActualizarUsuario, IniciarSesion } from "../controllers/users.controllers.js";
const router = Router();


router.get("/usuarios", BuscarTodosLosUsuarios);

//:id es una variable enviada por params
router.get("/usuarios/:id", BuscarUsusarioPorCodigo);


router.post("/usuarios", CrearUsuario);

//eliminar un usuario
router.delete("/usuarios/:id", EliminarUsuario);

//UPDATE
router.put("/usuarios/:id", ActualizarUsuario);


router.post("/IniciarSesion", IniciarSesion);



export default router;
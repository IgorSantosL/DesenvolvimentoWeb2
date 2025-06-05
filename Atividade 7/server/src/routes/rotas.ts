import { Router } from "express";
import { cidade, cidadeIncidencia } from "../controllers/controller";

const routes = Router();

routes.get("/cidades", cidade);
routes.get("/cidades/:id", cidadeIncidencia);

export default routes;
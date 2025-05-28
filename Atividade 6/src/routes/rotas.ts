import { Router } from "express";
import { cidade, cidadeIncidencia } from "../controllers/controller";

const routes = Router();

routes.get("/cidade", cidade);
routes.get("/cidade/:id", cidadeIncidencia);

export default routes;
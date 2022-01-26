import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const carsRoutes = Router(); 

let createCarController = new CreateCarController()

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle);

export { carsRoutes }
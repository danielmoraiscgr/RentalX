import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router(); 

const createCarController = new CreateCarController()
const listAvailabeCarsController = new ListAvailableCarsController()

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle);

carsRoutes.get(
    "/available",listAvailabeCarsController.handle);

export { carsRoutes }
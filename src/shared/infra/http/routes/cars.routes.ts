import { Router } from "express"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationUseCase } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router(); 

const createCarController = new CreateCarController()
const listAvailabeCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle);

carsRoutes.get(
    "/available",listAvailabeCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle);

export { carsRoutes }
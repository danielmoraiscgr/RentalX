import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { DevolutionRentalController } from "@modules/rentals/useCases/createRental/devolutionRental/DevolutionrentalController";

const rentalsRoutes = Router(); 

const createRentalController = new CreateRentalController(); 
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    createRentalController.handle);

rentalsRoutes.post("/devolution/:id",
    ensureAuthenticated, 
    devolutionRentalController.handle)

export { rentalsRoutes }
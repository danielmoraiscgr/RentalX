import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalsRoutes = Router(); 

const createRentalController = new CreateRentalController(); 

rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    createRentalController.handle);

export { rentalsRoutes }
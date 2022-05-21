import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";


const rentalsRoutes = Router(); 

const createRentalController = new CreateRentalController(); 
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserUseCase = new ListRentalsByUserController(); 

rentalsRoutes.post(
    "/",
    ensureAuthenticated,
    createRentalController.handle);

rentalsRoutes.post("/devolution/:id",
    ensureAuthenticated, 
    devolutionRentalController.handle)

rentalsRoutes.get("/user",
    ensureAuthenticated, 
    listRentalsByUserUseCase.handle)

export { rentalsRoutes }
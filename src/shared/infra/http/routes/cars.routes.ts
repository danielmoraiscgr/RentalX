import { Router } from "express"
import multer from "multer";

import uploadConfig from "@config/upload"
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailabeCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController();
const updateCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle);

carsRoutes.get(
    "/available", listAvailabeCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle);

carsRoutes.post("/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    updateCarImagesController.handle)

export { carsRoutes }
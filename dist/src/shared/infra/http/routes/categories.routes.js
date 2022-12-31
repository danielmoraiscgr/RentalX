"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateCategoryController_1 = require("@modules/cars/useCases/createCategory/CreateCategoryController");
const ListCategoriesController_1 = require("@modules/cars/useCases/listCategories/ListCategoriesController");
const ImportCategoryController_1 = require("@modules/cars/useCases/importCategory/ImportCategoryController");
const ensureAuthenticate_1 = require("@shared/infra/http/middlewares/ensureAuthenticate");
const ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const upload = (0, multer_1.default)({
    dest: "./tmp",
});
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new ImportCategoryController_1.ImportCategoryController();
const listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
categoriesRoutes.post("/", ensureAuthenticate_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", ensureAuthenticate_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.single("file"), importCategoryController.handler);

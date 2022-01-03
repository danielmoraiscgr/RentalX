import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoresUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoriesUseCase = new ListCategoresUseCase(categoriesRepository)

const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController }

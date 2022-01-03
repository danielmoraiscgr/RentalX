import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router(); 

categoriesRoutes.post("/", (request, response ) => {
    return createCategoryController.handle(request, response);

})

categoriesRoutes.get("/",(request, response) =>{
    return listCategoriesController.handle(request, response);
})

categoriesRoutes.delete("/",(request,response) => {
    const { id }  = request.body;

   // const indexDeletarCategoria = categoriesRepository.delete(id);

  //  if(indexDeletarCategoria < 0 ) {
  //      return response.status(400).json({ error: "Categoria não encontrada !"})
  //  }

  //  return response.status(201).json({ message: "Categoria deletada !"})

})

export { categoriesRoutes }
import { Router } from "express";
import multer from "multer";

import createCategoryController  from "../modules/cars/useCases/createCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router(); 

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/", (request, response ) => {
    console.log("Reload funcionando")
    return createCategoryController().handle(request, response);

})

categoriesRoutes.get("/",(request, response) =>{
    return listCategoriesController().handle(request, response);
})

categoriesRoutes.post("/import",upload.single("file"), (request, response) => {
    return importCategoryController.handler(request, response);
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
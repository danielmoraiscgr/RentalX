import { Request, Response } from 'express';
import { ListCategoresUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoresUseCase) {}

     async handle(request: Request, response: Response): Promise<Response>{
        const all = this.listCategoriesUseCase.execute();

        return response.json(all);
     }
}

export { ListCategoriesController }
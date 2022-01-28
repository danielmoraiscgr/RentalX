import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoresUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {


     async handle(request: Request, response: Response): Promise<Response>{

        const listCategoriesUseCase = container.resolve(ListCategoresUseCase);
        const all = await listCategoriesUseCase.execute();

        return response.status(200).json(all);
     }
}

export { ListCategoriesController }
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController { 
     async handle(request: Request, response: Response){
        const { brand, 
            category_id, 
            daily_rate, 
            description, 
            license_plate, 
            fine_amount, 
            name } = request.body;

        const createCarUseCase = container.resolve(CreateCarUseCase) 

        const car = await createCarUseCase.execute({
            brand, 
            category_id, 
            daily_rate, 
            description, 
            license_plate, 
            fine_amount, 
            name
        });

        return response.status(201).json(car);
        
     }
}

export { CreateCarController }
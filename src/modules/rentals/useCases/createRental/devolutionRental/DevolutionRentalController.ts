import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentaUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id: user_id } = request.user; 
        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentaUseCase);

        const rental = await devolutionRentalUseCase.execute({
            id,
            user_id
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController }
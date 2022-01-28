import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
   async handle(request: Request, response: Response): Promise<Response> {
       const { id } = request.params;
       const images = request.files as IFiles[];

       const updateCarImageUseCase = container.resolve(UpdateCarImagesUseCase);

       const images_name = images.map(file => file.filename)

       await updateCarImageUseCase.execute({
           car_id: id,
           images_name
       });

       return response.status(201).send(); 

   }
}

export { UploadCarImagesController }
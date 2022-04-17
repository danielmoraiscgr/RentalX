import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory"
import { SpecificationsRepositoryInMemory } from "@modules/cars/in-memory/SpecificationsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"



let createCarSpecificicationUseCase : CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory()
        createCarSpecificicationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory)
    })

    it("should not be able to add a new specification to a non exists car", async ()=> {
        const car_id = "1234";
        const specifications_id= ["543221"];

        await expect(createCarSpecificicationUseCase.execute({
            car_id,
            specifications_id
        })
       ).rejects.toEqual(new AppError("Car does not exist !"))
    });

    it("should be able to add a new specification to the car", async ()=> {

        const car =  await carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        })

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificicationUseCase.execute({
            car_id: car.id,
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
        
    })
})
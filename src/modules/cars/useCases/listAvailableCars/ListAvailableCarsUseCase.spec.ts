import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("shoul be able to list all available cars", async () => {
       const car = await carsRepositoryInMemory.create({
            name: "Carro1",
            description: "Car description",
            daily_rate: 200,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro2",
            description: "Car description",
            daily_rate: 200,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test"
        });
        
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro3",
            description: "Car description",
            daily_rate: 200,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro3"
        });

        console.log(cars);

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro4",
            description: "Car description",
            daily_rate: 200,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "12345"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });

        console.log(cars);

        expect(cars).toEqual([car]);
    });
})
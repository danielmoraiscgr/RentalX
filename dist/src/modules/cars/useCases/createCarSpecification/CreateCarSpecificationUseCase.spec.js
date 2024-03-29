"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CarsRepositoryInMemory_1 = require("@modules/cars/in-memory/CarsRepositoryInMemory");
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificicationUseCase;
let carsRepositoryInMemory;
let specificationRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificicationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory);
    });
    it("should not be able to add a new specification to a non exists car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = "1234";
        const specifications_id = ["543221"];
        yield expect(createCarSpecificicationUseCase.execute({
            car_id,
            specifications_id
        })).rejects.toEqual(new AppError_1.AppError("Car does not exist !"));
    }));
    it("should be able to add a new specification to the car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Name car",
            description: "Description car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category"
        });
        const specification = yield specificationRepositoryInMemory.create({
            description: "test",
            name: "test",
        });
        const specifications_id = [specification.id];
        const specificationsCars = yield createCarSpecificicationUseCase.execute({
            car_id: car.id,
            specifications_id
        });
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    }));
});

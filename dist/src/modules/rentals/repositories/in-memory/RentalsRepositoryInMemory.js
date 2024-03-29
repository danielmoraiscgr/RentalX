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
exports.RentalsRepositoryInMemory = void 0;
const Rental_1 = require("../../infra/typeorm/entities/Rental");
class RentalsRepositoryInMemory {
    constructor() {
        this.rentals = [];
    }
    findOpenRentalByCar(car_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
        });
    }
    findOpenRentalByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
        });
    }
    create({ car_id, expected_return_date, user_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = new Rental_1.Rental();
            Object.assign(rental, {
                car_id,
                expected_return_date,
                user_id,
                start_date: new Date(),
            });
            this.rentals.push(rental);
            return rental;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = this.rentals.find((rental) => rental.id === id);
            return rental;
        });
    }
    findByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = this.rentals.filter((rental) => rental.user_id === user_id);
            return rental;
        });
    }
}
exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;

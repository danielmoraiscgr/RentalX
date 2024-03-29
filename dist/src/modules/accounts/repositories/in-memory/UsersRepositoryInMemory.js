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
exports.UsersRepositoryInMemory = void 0;
const User_1 = require("@modules/accounts/infra/typeorm/entities/User");
class UsersRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    create({ name, email, password, drive_license, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            Object.assign(user, {
                name,
                email,
                password,
                drive_license,
            });
            this.users.push(user);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.email === email);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.id === id);
        });
    }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;

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
const AppError_1 = require("@shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const CreateUserUseCase_1 = require("@modules/accounts/useCases/createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
describe("Authenticate User", () => {
    let authencicateUserUseCase;
    let usersRepositoryInMemory;
    let usersTokensRepositoryInMemory;
    let dateProvider;
    let createUserUseCase;
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authencicateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("Should be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            drive_license: "000123",
            email: "user1@test.com",
            password: "12345",
            name: "User Test"
        };
        yield createUserUseCase.execute(user);
        const result = yield authencicateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    }));
    it("should not be able to authenticate an noexistent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authencicateUserUseCase.execute({
            email: "falso@gmail.com",
            password: "1234"
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect !"));
    }));
    it("should not be able to authenticate with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            drive_license: "88888",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error"
        };
        yield createUserUseCase.execute(user);
        yield expect(authencicateUserUseCase.execute({
            email: user.email,
            password: "incorrectPassword"
        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect !"));
    }));
});

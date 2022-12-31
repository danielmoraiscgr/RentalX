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
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProvider;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("Should be able to send a forgot password mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = spyOn(mailProvider, "sendMail");
        yield usersRepositoryInMemory.create({
            drive_license: "664168",
            email: "morais.daniel@gmail.com",
            name: "Blanche Curry",
            password: "1234"
        });
        yield sendForgotPasswordMailUseCase.execute("morais.daniel@gmail.com");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send an email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("ka@uf.pr")).rejects.toEqual(new AppError_1.AppError("User does not exists !"));
    }));
    it("should be able to create an users token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
        usersRepositoryInMemory.create({
            drive_license: "737383",
            email: "morais@gmail.com",
            name: "Roberto Morais",
            password: "1234"
        });
        yield sendForgotPasswordMailUseCase.execute("morais@gmail.com");
        expect(generateTokenMail).toBeCalled();
    }));
});

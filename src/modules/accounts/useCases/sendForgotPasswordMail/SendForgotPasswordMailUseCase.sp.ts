import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () =>{
    beforeEach(()=>{
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user",async()=>{
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            drive_license: "664168",
            email: "morais.daniel@gmail.com",
            name: "Blanche Curry",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("morais.daniel@gmail.com");

        expect(sendMail).toHaveBeenCalled(); 
    });

    it("should not be able to send an email if user does not exists",async()=>{
        await expect(
            sendForgotPasswordMailUseCase.execute("ka@uf.pr")
        ).rejects.toEqual(new AppError("User does not exists !"));
    });

    it("should be able to create an users token",async()=>{
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory,"create");

        usersRepositoryInMemory.create({
            drive_license: "737383",
            email: "morais@gmail.com",
            name: "Roberto Morais",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("morais@gmail.com");

        expect(generateTokenMail).toBeCalled(); 

    })
});
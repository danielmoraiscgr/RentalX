import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase }  from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

describe("Authenticate User", ()=>{

    let authencicateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
    let dateProvider: DayjsDateProvider;
    let createUserUseCase: CreateUserUseCase;


    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authencicateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
            ); 
       
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })


    it("Should be able to authenticate an user", async () =>{
        const user: ICreateUserDTO = {
            drive_license: "000123",
            email: "user1@test.com",
            password: "12345",
            name: "User Test"
        };
        await createUserUseCase.execute(user);

        const result = await authencicateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an noexistent user", async()=>{
        await expect(authencicateUserUseCase.execute({
                email: "falso@gmail.com",
                password: "1234"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect !"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        
        const user: ICreateUserDTO = {
            drive_license: "88888",
            email: "user@user.com",
            password: "1234",
            name: "User Test Error"
        }
        await createUserUseCase.execute(user);

        await expect(authencicateUserUseCase.execute({
            email: user.email,
            password: "incorrectPassword"
        })
    ).rejects.toEqual(new AppError("Email or password incorrect !"))
    });
});
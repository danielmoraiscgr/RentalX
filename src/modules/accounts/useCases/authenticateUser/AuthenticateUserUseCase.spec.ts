import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase }  from "./AuthenticateUserUseCase";

describe("Authenticate User", ()=>{

    let authencicateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let createuserUseCase: CreateUserUseCase;

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authencicateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory); 
       
    })

    createuserUseCase = new CreateUserUseCase(usersRepositoryInMemory)

    it("Should be able to authenticate an user", async () =>{
        const user: ICreateUserDTO = {
            drive_license: "000123",
            email: "user1@test.com",
            password: "12345",
            name: "User Test"
        };
        await createuserUseCase.execute(user);

        const result = await authencicateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    })
})
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {

   constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
   ){

   }
   async execute(id: string): Promise<IUserResponseDTO> {
      const user = await this.usersRepository.findById(id);

      return UserMap.toDTO(user);
      
   }
}

export { ProfileUserUseCase }
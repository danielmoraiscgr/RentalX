import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository{
    
    specifications : Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification(); 

        Object.assign(specification,{
            name,
            description,
        })

        this.specifications.push(specification)

        return specification
    }

    async findByName(name: string): Promise<any> {
        return this.specifications.find(
        (specification) => specification.name === name
        );
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter(
            specifications =>ids.includes(specifications.id)
        );

        return allSpecifications
    }

}

export { SpecificationsRepositoryInMemory }
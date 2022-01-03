import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string; 
    description: string;
}

interface ICategoriesRepository {
    findByName(name:string): Category;
    list(): Category[];
    delete(id: string);
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICreateCategoryDTO, ICategoriesRepository }
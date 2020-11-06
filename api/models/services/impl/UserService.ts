import { EntityManager, getManager } from "typeorm";
import { User } from "../..";
import { UserService } from "../UserService";

export class UserServiceImpl implements UserService {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager('app');
    }

    async findAll(): Promise<User[]> {
        const users = await this.entityManager.find(User);

        return (users);
    }

    async insert(user: User): Promise<User> {
        const saved = await this.entityManager.save(user);

        return (saved);
    }

    async findOne(id: number): Promise<User> {
        const user = await this.entityManager.findOne(User, id);

        return (user);
    }

    async update(user: User): Promise<User> {
        const saved = await this.entityManager.save(user);

        return (saved);
    }

    async delete(user: User): Promise<boolean> {
        const result = await this.entityManager.delete(User, user.id);
    
        return (result.affected > 0);
    }


}
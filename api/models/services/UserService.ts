import { User } from "..";

export abstract class UserService {
    abstract findAll(): Promise<Array<User>>;
    abstract insert(user: User): Promise<User>;
    abstract findOne(id: number): Promise<User>;
    abstract update(user: User): Promise<User>;
    abstract delete(user: User): Promise<boolean>;
}

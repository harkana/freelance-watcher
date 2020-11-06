import { User } from "..";

export abstract class UserService {
    abstract findAll(): Array<User>;
    abstract insert(offer: User): User;
    abstract findOne(id: number): User;
    abstract update(offer: User): User;
    abstract delete(offer: User): boolean;
}

import { User } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];
    
    async create(user: User): Promise<void> {
        this.users.push(user);
    }
    
    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null;
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }
    
    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
        this.users[index] = user;
        }
    }
    
    async delete(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id !== id);
    }
}

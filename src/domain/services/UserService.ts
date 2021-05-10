import { User } from '../model/User';
import { inject, service } from '@config/ioc';
import { UserRepository } from '../../infrastructure/Dynamodb/respositories/UserRepository';

/**
 * UserService (contains all necessary methods for user)
 */
@service(UserService)
export class UserService {
    constructor(@inject('userRepository') private userRepository: UserRepository) {}

    /**
     * Save User
     * @param user
     */
    async saveUser(user: User): Promise<User> {
        return await this.userRepository.saveUser(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.findAllUsers();
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findUserById(id);
    }
}

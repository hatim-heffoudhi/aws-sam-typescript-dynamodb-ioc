import { User } from '../model/User';

/**
 * User Repository Interface
 */
export interface UserRepositoryInterface {
    /**
     * Save User to database
     * @param user
     */
    saveUser(user: User): Promise<User>;

    /**
     * Find All Users
     */
    findAllUsers(): Promise<User[]>;

    /**
     * Find User By Id
     * @param id
     */
    findUserById(id: string): Promise<User>;
}

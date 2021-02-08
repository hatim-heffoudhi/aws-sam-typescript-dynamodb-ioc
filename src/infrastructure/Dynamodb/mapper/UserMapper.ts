import { User } from '../../../domain/model/User';
import { UserEntity } from '../model/UserEntity';

/**
 * User Mapper
 */
export class UserMapper {
    private static INFO = 'info';

    /**
     * From Entity to Domain
     * @param userEntity
     */
    public static fromEntityToDomain(userEntity: UserEntity): User {
        let user: User = new User();
        user.id = userEntity.pk;
        user.login = userEntity.gsi;
        user.firstName = userEntity.firstName;
        user.lastName = userEntity.lastName;
        user.civility = userEntity.civility;
        user.email = userEntity.email;

        return user;
    }

    /**
     * From Entities To Domains
     * @param userEntities
     */
    public static fromEntitiesToDomains(userEntities: UserEntity[]): User[] {
        const users: User[] = [];
        userEntities.forEach(userEntity => {
            users.push(UserMapper.fromEntityToDomain(userEntity));
        });
        return users;
    }

    /**
     * From Domain To Entity
     * @param user
     */
    public static fromDomainToEntity(user: User): UserEntity {
        let userEntity: UserEntity = new UserEntity();
        userEntity.pk = user.id;
        userEntity.civility = user.civility;
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.gsi = user.login;

        return userEntity;
    }

    /**
     * From Domains To Entities
     * @param users
     */
    public static fromDomainsToEntities(users: User[]): UserEntity[] {
        const userEntities: UserEntity[] = [];
        users.forEach(user => {
            userEntities.push(UserMapper.fromDomainToEntity(user));
        });
        return userEntities;
    }
}

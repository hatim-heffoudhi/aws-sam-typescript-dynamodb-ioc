/**
 * User Entity
 */
export class UserEntity {
    /**
     * Primary Key (Hash Key)
     */
    pk: string;
    /**
     * Secondary Key (Range Key)
     */
    sk: string;
    /**
     * GSI (Global Secondary Index)
     */
    gsi: string;
    /**
     * Password
     */
    password: string;
    /**
     * FirstName
     */
    firstName: string;
    /**
     * LastName
     */
    lastName: string;
    /**
     * Email
     */
    email: string;
    /**
     * Civility
     */
    civility?: string;

    //TODO add methods
}


import {APIGatewayEvent} from 'aws-lambda';
import {User} from '@domain/model/User';
import {iocContainer} from '@config/ioc';
import {UserService} from '@domain/services/UserService';
import 'reflect-metadata';

/**
 * Entry point of get all users lambda
 * @param event
 */
const userService = iocContainer.get<UserService>(UserService);

export const handler = async (event: APIGatewayEvent): Promise<any> => {
    try {
        const users: User[] = await userService.getAllUsers();

        return {
            statusCode: 200,
            body: JSON.stringify(users),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};

import {APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda';
import {User} from '@domain/model/User';
import {iocContainer} from '@config/ioc';
import {UserService} from '@domain/services/UserService';
import 'reflect-metadata';

/**
 * Entry point for user creation lambda
 * @param event
 */

const userService: UserService = iocContainer.get<UserService>(UserService);

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        let user = JSON.parse(event.body) as User;

        const savedUser: User = await userService.saveUser(user);

        return {
            statusCode: 200,
            body: JSON.stringify(savedUser),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};

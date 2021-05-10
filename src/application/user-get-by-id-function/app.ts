import { APIGatewayEvent } from 'aws-lambda';
import { User } from '@domain/model/User';
import { iocContainer } from '@config/ioc';
import { UserService } from '@domain/services/UserService';
import 'reflect-metadata';
/**
 * Entry point of the lambda
 * @param event
 */

const userService: UserService = ((global as any).userService = iocContainer.get<UserService>(UserService));

export const handler = async (event: APIGatewayEvent): Promise<any> => {
    try {
        let userId = event.pathParameters.id;
        const user: User = await userService.getUserById(userId);

        return {
            statusCode: 200,
            body: JSON.stringify(user),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};

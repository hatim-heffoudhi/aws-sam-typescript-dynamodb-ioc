import * as uuid from 'uuid';

import { DynamoDB } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { UserEntity } from '../model/UserEntity';
import { UserRepositoryInterface } from '../../../domain/repositories/UserRepositoryInterface';
import { User } from '../../../domain/model/User';
import { UserMapper } from '../mapper/UserMapper';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { repository } from '../../../zconfig/ioc';
import ScanInput = DocumentClient.ScanInput;

/**
 * UserRepository
 */
@repository('userRepository')
export class UserRepository implements UserRepositoryInterface {
    private dynamoDBClient: DocumentClient;
    private PREFIX = 'user_';
    private INFO = 'info';
    private static TABLE_NAME = process.env.TABLE_NAME;

    /**
     * constructor to initiate Dynamodb Client
     */
    constructor() {
        this.dynamoDBClient = new DynamoDB.DocumentClient();
        // if mode local or dev ==> dynamodb Locally
        if (process.env.LAMBDA_NODE_ENV == 'local') {
            let serviceConfigOptions: ServiceConfigurationOptions = {
                region: 'us-west-2',
                endpoint: 'http://localhost:8000',
            };
            this.dynamoDBClient = new DynamoDB.DocumentClient(serviceConfigOptions);
        }
    }

    /**
     * save User
     * @param user
     */
    async saveUser(user: User): Promise<User> {
        // validate user method
        // utils
        let userEntity: UserEntity = UserMapper.fromDomainToEntity(user);

        userEntity.pk = this.PREFIX + uuid.v4();
        userEntity.sk = this.INFO;

        const params = {
            TableName: UserRepository.TABLE_NAME,
            Item: userEntity,
        };
        await this.dynamoDBClient.put(params).promise();
        const savedUser: User = UserMapper.fromEntityToDomain(userEntity);
        return savedUser;
    }

    /**
     * Find User By Id
     * @param id
     */
    async findUserById(id: String): Promise<User> {
        const params = {
            TableName: UserRepository.TABLE_NAME,
            Key: {
                pk: id,
                sk: this.INFO,
            },
        };
        const savedUserEntity = await this.dynamoDBClient.get(params).promise();
        // mapper to user
        const user: User = UserMapper.fromEntityToDomain(savedUserEntity.Item as UserEntity);

        return user;
    }

    /**
     * Find All Users
     * Scan query with LastEvaluatedKey
     */
    async findAllUsers(): Promise<User[]> {
        const params: ScanInput = {
            TableName: UserRepository.TABLE_NAME,
        };
        let scanResults: User[] = [];
        let items;
        do {
            items = await this.dynamoDBClient.scan(params).promise();
            items.Items.forEach((item: UserEntity) => scanResults.push(UserMapper.fromEntityToDomain(item)));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != 'undefined');
        return scanResults;
    }
}

import User from '../../domain/User';
import UserRepository from '../../domain/UserRepository';
import AWS from 'aws-sdk';

export default class UserRepositoryDynamoDb extends UserRepository {
  private table;
  private db;

  constructor() {
    super();

    this.table = process.env.USER_TABLE! || 'users';
    this.db = new AWS.DynamoDB.DocumentClient();
  }

  async find() {
    const { Items: dynamoDbUsers } = await this.db.scan({
      TableName: this.table,
      FilterExpression: 'attribute_not_exists(deletedAt)'
    })
    .promise();

    return dynamoDbUsers ? dynamoDbUsers.map((dynamoDbUser: any) => {
      return new User(
        dynamoDbUser.id,
        dynamoDbUser.name!,
        dynamoDbUser.password!,
        dynamoDbUser.createdAt!,
        dynamoDbUser.updatedAt!,
        dynamoDbUser.deletedAt!
      )
    }) : [];
  }

  async findOne(id: string) {
    const { Item: dynamoDbUser } = await this.db.get({
      TableName: this.table,
      Key: { id: id }
    })
    .promise();

    return dynamoDbUser ? new User(
      dynamoDbUser!.id,
      dynamoDbUser!.name!,
      dynamoDbUser!.password!,
      dynamoDbUser!.createdAt!,
      dynamoDbUser!.updatedAt!,
      dynamoDbUser!.deletedAt!
    ) : null;
  }

  async findByName(name: string) {
    const data = await this.db.scan({
      TableName: this.table,
      FilterExpression: '#name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name,
      }
    })
    .promise();

    let dynamoDbUser: any = data.Items?.pop();
    return dynamoDbUser ? new User(
      dynamoDbUser!.id,
      dynamoDbUser!.name!,
      dynamoDbUser!.password!,
      dynamoDbUser!.createdAt!,
      dynamoDbUser!.updatedAt!,
      dynamoDbUser!.deletedAt!
    ) : null;
  }

  validatePassword(password: string, dbPassword: string) {
    return password === dbPassword;
  }

  async save(userEntity: User) {
    const { id, name, password } = userEntity;
    const now = new Date().toISOString();

    const dynamoDbUser = {
      id: id,
      name: name,
      password: password,
      createdAt: now,
      updatedAt: now,
    };

    await this.db.put({
      TableName: this.table,
      Item: dynamoDbUser
    })
    .promise();

    return dynamoDbUser;
  }

  async update(userEntity: User) {
    const { id, name, password, createdAt } = userEntity
    const now = new Date().toISOString();
    const dynamoDbUser = {
      id: id,
      name: name,
      password: password,
      createdAt: createdAt,
      updatedAt: now,
    };

    await this.db.update({
      TableName: this.table,
      Key: {
        id: dynamoDbUser.id,
      },
      UpdateExpression: 'set #name = :name, #password = :password, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#password': 'password',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':name': dynamoDbUser.name,
        ':password': dynamoDbUser.password,
        ':updatedAt': dynamoDbUser.updatedAt,
      }
    })
    .promise();

    return dynamoDbUser;
  }

  async remove(id: string) {
    return this.db.update({
      TableName: this.table,
      Key: {
        id: id,
      },
      UpdateExpression: 'set #deletedAt = :deletedAt',
      ExpressionAttributeNames: {
        '#deletedAt': 'deletedAt',
      },
      ExpressionAttributeValues: {
        ':deletedAt': new Date().toISOString(),
      }
    })
    .promise();
  }
}

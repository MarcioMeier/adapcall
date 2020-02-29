const aws = require('aws-sdk');

const TABLE_NAME = 'Ligacoes';

module.exports = class Dynamo {
  constructor() {
    this.db = new aws.DynamoDB.DocumentClient({
      endpoint: (process.env.IS_OFFLINE
        ? 'http://localhost:8000'
        : undefined
      ),
      region: process.env.region
    });
  }

  async scan() {
    try {
      const { Items } = await this.db.scan({
        TableName: TABLE_NAME,
        Limit: 50,
      }).promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

  async query() {
    try {
      const { Items } = await this.db.query().promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

  async get() {
    try {
      const { Items } = await this.db.get().promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

  async put() {
    try {
      const { Items } = await this.db.put().promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

  async update() {
    try {
      const { Items } = await this.db.update().promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

  async delete() {
    try {
      const { Items } = await this.db.delete().promise();

      return Items;
    } catch (error) {
      throw error
    }
  }

}
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const ddb = new DynamoDBClient({});
const tableName = process.env.TABLE_NAME!;

export const handler = async () => {
  try {
    const { Item } = await ddb.send(
      new GetItemCommand({
        TableName: tableName,
        Key: {
          id: { S: 'latest' },
        },
      })
    );

    if (!Item) {
      throw new Error('No exchange rate data found.');
    }

    const response = {
      timestamp: Number(Item.timestamp.N),
      base: Item.base.S,
      rates: JSON.parse(Item.rates.S as string),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching exchange rate', error: err.message }),
    };
  }
};
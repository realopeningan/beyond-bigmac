import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import {
  SSMClient,
  GetParameterCommand,
} from '@aws-sdk/client-ssm';
import fetch from 'node-fetch';

const ddb = new DynamoDBClient({});
const ssm = new SSMClient({});

const tableName = process.env.TABLE_NAME!;
const paramName = process.env.API_KEY_PARAM!;

export const handler = async () => {
  try {
    // 1. SSM에서 API 키 가져오기
    const { Parameter } = await ssm.send(
      new GetParameterCommand({
        Name: paramName,
        WithDecryption: false,
      })
    );

    const apiKey = Parameter?.Value;
    if (!apiKey) throw new Error('API key not found');

    // 2. API 호출
    const response = await fetch(`https://api.exchangerate.host/live?access_key=${apiKey}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(`ExchangeRate API error: ${JSON.stringify(data.error)}`);
    }

    // 3. DynamoDB에 저장 (id는 고정 값으로 최신만 유지)
    const putCommand = new PutItemCommand({
      TableName: tableName,
      Item: {
        id: { S: 'latest' },
        timestamp: { N: String(data.timestamp) },
        base: { S: data.source },
        rates: { S: JSON.stringify(data.quotes) },
      },
    });

    await ddb.send(putCommand);

    console.log('환율 정보 저장 완료');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: '환율 저장 성공' }),
    };
  } catch (err: any) {
    console.error('에러 발생:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: '에러 발생', error: err.message }),
    };
  }
};
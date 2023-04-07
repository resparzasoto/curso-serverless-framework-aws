import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'DUMMY_AWS_ACCESS_KEY_ID',
    secretAccessKey: 'DUMMY_AWS_SECRET_ACCESS_KEY',
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const getUsers = async (
  _request: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const params: GetCommandInput = {
    TableName: 'Users',
    Key: {
      id: '1',
    },
  };

  const result = await ddbDocClient.send(new GetCommand(params));

  let response: APIGatewayProxyResult = {
    statusCode: 204,
    body: JSON.stringify({ message: 'user not found' }),
  };

  if (result.Item) {
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: result.Item }),
    };
  }

  return response;
};

export { getUsers };

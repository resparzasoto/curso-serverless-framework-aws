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

const client = new DynamoDBClient({});
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

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };

  return response;
};

export { getUsers };

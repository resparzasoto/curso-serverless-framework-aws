import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

const hello = async (
  _request: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world using serverless framework with typescript!',
    }),
  };

  return response;
};

export { hello };

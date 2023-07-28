import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ExecuteStatementCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = 'eu-south-1'; // Change this to match your region

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

// ?fromStamp=1690370334
export const handler = async (event) => {
  const startingTimeExclusive = event.queryStringParameters?.fromStamp ?? 0;

  const command = new ExecuteStatementCommand({
    Statement: 'SELECT * FROM "sc-fed_simplechat" WHERE messageTime > ?',
    Parameters: [Number(startingTimeExclusive)]
  });

  try {
    const data = await docClient.send(command);
    data.Items.sort((a,b) => a.messageTime - b.messageTime);
    
    return { 
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(data) 
    };
  } catch (err) {
    return { error: err };
  }
};

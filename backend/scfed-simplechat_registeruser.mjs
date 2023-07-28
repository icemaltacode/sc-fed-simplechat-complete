import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ExecuteStatementCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = 'eu-south-1'; // Change this to match your region

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

// ?userName=Doris
export const handler = async (event, context) => {
  const senderId = 'system';//context.awsRequestId;
  const messageTime = Date.now();
  const senderName = 'SimpleChat';
  const messageSent = `${event.queryStringParameters.userName} has joined the chat.`;

  const command = new ExecuteStatementCommand({
    Statement: `INSERT INTO "sc-fed_simplechat" 
    value {'senderId': ?, 'messageTime': ?, 'messageSent': ?, 'senderName': ?}`,
    Parameters: [senderId, messageTime, messageSent, senderName]
  });

  try {
    const response = await docClient.send(command);
    return { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'false'
      },
      body: JSON.stringify({...response, 'senderId': context.awsRequestId}) 
    };
  } catch (err) {
    return { error: err };
  }
};

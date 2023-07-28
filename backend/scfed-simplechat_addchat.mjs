import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ExecuteStatementCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const REGION = 'eu-south-1'; // Change this to match your region

const docClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: REGION })
);

// ?senderName=Doris&senderId=whatever&message=Hello
export const handler = async (event, context) => {
  const senderId = event.queryStringParameters.senderId;
  const messageTime = Date.now();
  const senderName = event.queryStringParameters.senderName;
  const messageSent = event.queryStringParameters.message;

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
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(response) 
    };
  } catch (err) {
    return { error: err };
  }
};

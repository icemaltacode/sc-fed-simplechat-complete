import axios from 'axios';

const API_KEY = import.meta.env.VITE_SIMPLECHAT_API_KEY;

const HEADER = {
  headers: {
    'x-api-key': API_KEY
  }
};

const BASE_URL = 'https://wdxpqav9be.execute-api.eu-south-1.amazonaws.com/prod/chat'

export async function getChats() {
    const res = await axios
        .get(BASE_URL, HEADER)
        .catch(err => console.error(err));

    const parsedBody = JSON.parse(res.data.body);
    return parsedBody.Items;
}

export async function addChat(chat) {
    const config = {
        headers: {
            'x-api-key': API_KEY
          },
        params: {
            senderName: chat.senderName,
            senderId: chat.senderId,
            message: chat.message
        }
        
    };

    const res = await axios
        .post(BASE_URL, null, config)
        .catch(err => console.error(err));
    return res.data.$metadata.httpStatusCode;
}
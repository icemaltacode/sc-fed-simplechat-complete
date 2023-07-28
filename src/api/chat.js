import axios from 'axios';

const API_KEY = process.env.REACT_APP_SIMPLECHAT_API_KEY;

const HEADER = {
  headers: {
    'x-api-key': API_KEY
  }
};

const BASE_URL = 'https://rcwwocnqq8.execute-api.eu-south-1.amazonaws.com/prod/chat'

export async function getChats() {
    const res = await axios
        .get(BASE_URL, HEADER)
        .catch(err => console.error(err));
    return res.data.Items;
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
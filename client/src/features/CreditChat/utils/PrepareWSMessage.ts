type MessageType = 'connection' | 'message' | 'disconnection';

export const prepareWSMessage = (message: string, type: MessageType) =>
    JSON.stringify({
        type,
        sender: 'user',
        body: message,
    });

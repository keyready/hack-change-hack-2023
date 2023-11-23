import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import useWebSocket from 'react-use-websocket';
import { Message, MessageCard } from 'entities/Message';
import { prepareWSMessage } from '../../utils/PrepareWSMessage';
import { CreditChatInput } from '../CreditChatInput/CreditChatInput';
import classes from './CreditChat.module.scss';

interface CreditChatProps {
    className?: string;
}

export const CreditChat = memo((props: CreditChatProps) => {
    const { className } = props;

    const { readyState, sendMessage, lastMessage } = useWebSocket('ws://localhost:5000/chat');

    const [inputQuery, setInputQuery] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(40);
    const [i, setI] = useState<number>(0);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!focus) {
                return;
            }
            if (height > 90) {
                clearInterval(intervalId);
            } else {
                setHeight((prevValue) => prevValue + 5);
                setI((prevI) => prevI + 1);
            }
        }, 5);
        return () => clearInterval(intervalId);
    }, [focus, height, i]);

    const handleMessageSend = useCallback(() => {
        sendMessage(prepareWSMessage(inputQuery, 'message'));
        setMessages((prevState) => [...prevState, { body: inputQuery, sender: 'user' }]);
        setInputQuery('');
    }, [inputQuery, sendMessage]);

    useEffect(() => {
        if (lastMessage?.data) {
            const { body, sender } = JSON.parse(lastMessage.data);

            setMessages((prevState) => [...prevState, { body, sender }]);
        }
    }, [lastMessage]);

    return (
        <VStack
            align="center"
            justify="center"
            style={{
                height: height !== 40 ? `${height}vh` : '',
                justifyContent: focus ? 'end' : 'space-between',
                padding: height !== 40 ? '30px 30px 100px 30px' : '30px',
            }}
            className={classNames(classes.CreditChat, {}, [className])}
        >
            {!focus && (
                <VStack maxW justify="center" gap="16" align="center">
                    <h1>Кредит на любые цели</h1>

                    <HStack maxW justify="center" gap="8" align="center">
                        <div className={classes.btn}>Заглушка кнопки</div>
                        <div className={classes.btn}>Заглушка кнопки</div>
                    </HStack>
                </VStack>
            )}

            {messages.length ? (
                <VStack className={classes.chatArea} maxW justify="start" align="start">
                    {messages.map((message) => (
                        <MessageCard message={message.body} type={message.sender} />
                    ))}
                </VStack>
            ) : (
                ''
            )}

            <CreditChatInput
                handleMessageSend={handleMessageSend}
                // handleQueryCardClick={(value) => setInputQuery(value)}
                setFocus={setFocus}
                value={inputQuery}
                setValue={setInputQuery}
            />
        </VStack>
    );
});

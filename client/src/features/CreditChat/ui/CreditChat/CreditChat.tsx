import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import useWebSocket from 'react-use-websocket';
import { Message, MessageCard } from 'entities/Message';
import CloseIcon from 'shared/assets/icons/close-btn-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { borrowerSignup } from 'entities/Borrower';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { prepareWSMessage } from '../../utils/PrepareWSMessage';
import { CreditChatInput } from '../CreditChatInput/CreditChatInput';
import classes from './CreditChat.module.scss';

interface CreditChatProps {
    className?: string;
}

export const CreditChat = memo((props: CreditChatProps) => {
    const { className } = props;

    const { sendMessage, lastMessage } = useWebSocket('ws://localhost:5000/ws/giga_chat');

    const dispatch = useAppDispatch();

    const [isRegisterProcess, setIsRegisterProcess] = useState<number>(0);

    const [email, setEmail] = useState<string>('');

    const [inputQuery, setInputQuery] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(40);
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
            }
        }, 5);
        return () => clearInterval(intervalId);
    }, [focus, height]);

    const handleMessageSend = useCallback(() => {
        if (isRegisterProcess === 1) {
            if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputQuery)) {
                setIsRegisterProcess(2);
                setMessages((prevState) => [
                    ...prevState,
                    { body: inputQuery, sender: 'user' },
                    { body: 'А теперь придумайте пароль', sender: 'bot' },
                ]);
                setEmail(inputQuery);
                setInputQuery('');
            } else {
                setMessages((prevState) => [
                    ...prevState,
                    { body: inputQuery, sender: 'user' },
                    { body: 'Это не похоже на почту, попробуйте еще раз', sender: 'bot' },
                ]);
            }
            setInputQuery('');
            return;
        }
        if (isRegisterProcess === 2) {
            setMessages((prevState) => [
                ...prevState,
                { body: inputQuery, sender: 'user' },
                {
                    body:
                        'Теперь проверьте почту. ' +
                        'Я отправил Вам письмо для ' +
                        'подтверждения адреса. Когда ' +
                        'закончите, возвращайтесь сюда!',
                    sender: 'bot',
                },
            ]);
            setInputQuery('');

            dispatch(borrowerSignup({ email, password: inputQuery }));
            setIsRegisterProcess(0);
            return;
        }

        sendMessage(prepareWSMessage(inputQuery, 'message'));
        setMessages((prevState) => [...prevState, { body: inputQuery, sender: 'user' }]);
        setInputQuery('');

        const messagesArea = document.querySelector('#messagesAreaRef');
        if (messagesArea) messagesArea.scrollTo(0, messagesArea.scrollHeight);
    }, [dispatch, email, inputQuery, isRegisterProcess, sendMessage]);

    useEffect(() => {
        if (lastMessage?.data) {
            const { body, sender, type } = JSON.parse(lastMessage.data);

            if (type === 'register_start') {
                setIsRegisterProcess(1);
                setMessages((prevState) => [
                    ...prevState,
                    { body: 'Отлично! Введите Вашу почту', sender: 'bot' },
                ]);
                setInputQuery('');
                return;
            }

            setMessages((prevState) => [...prevState, { body, sender }]);
        }
    }, [lastMessage]);

    useEffect(() => {
        const messagesArea = document.querySelector('#messagesAreaRef');
        if (messagesArea) messagesArea.scrollTo(0, messagesArea.scrollHeight);
    }, [messages]);

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
            {focus && (
                <Button
                    onClick={() => {
                        setHeight(40);
                        setFocus(false);
                    }}
                    variant="clear"
                    className={classes.closeBtn}
                >
                    <Icon Svg={CloseIcon} />
                </Button>
            )}

            {!focus && (
                <VStack maxW justify="center" gap="16" align="center">
                    <h1>Кредит на любые цели</h1>

                    <HStack maxW justify="center" gap="8" align="center">
                        <div className={classes.btn}>Заглушка кнопки</div>
                        <div className={classes.btn}>Заглушка кнопки</div>
                    </HStack>
                </VStack>
            )}

            {messages.length && focus ? (
                <VStack
                    id="messagesAreaRef"
                    className={classes.chatArea}
                    maxW
                    justify="start"
                    align="start"
                >
                    {messages.map((message) => (
                        <MessageCard
                            key={message.body}
                            message={message.body}
                            type={message.sender}
                        />
                    ))}
                </VStack>
            ) : (
                ''
            )}

            <CreditChatInput
                handleMessageSend={handleMessageSend}
                setFocus={setFocus}
                value={inputQuery}
                setValue={setInputQuery}
            />
        </VStack>
    );
});

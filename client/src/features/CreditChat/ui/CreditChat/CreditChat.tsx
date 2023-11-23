import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { CreditChatInput } from '../CreditChatInput/CreditChatInput';
import classes from './CreditChat.module.scss';

interface CreditChatProps {
    className?: string;
}

export const CreditChat = memo((props: CreditChatProps) => {
    const { className } = props;

    const [inputQuery, setInputQuery] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);
    const [height, setHeight] = useState<number>(40);
    const [i, setI] = useState<number>(0);

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
        return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
    }, [focus, height, i]);

    return (
        <VStack
            align="center"
            justify="center"
            style={{
                height: height !== 40 ? `${height}vh` : '',
                justifyContent: height !== 40 ? 'space-between' : '',
                padding: height !== 40 ? '30px 30px 100px 30px' : '30px',
            }}
            className={classNames(classes.CreditChat, {}, [className])}
        >
            <VStack maxW justify="center" gap="16" align="center">
                <h1>Кредит на любые цели</h1>

                <HStack maxW justify="center" gap="8" align="center">
                    <div className={classes.btn}>Заглушка кнопки</div>
                    <div className={classes.btn}>Заглушка кнопки</div>
                </HStack>
            </VStack>

            <CreditChatInput
                handleMessageSend={() => alert(`отправлено: ${inputQuery}`)}
                handleQueryCardClick={(value) => alert(value)}
                setFocus={setFocus}
                value={inputQuery}
                setValue={setInputQuery}
            />
        </VStack>
    );
});

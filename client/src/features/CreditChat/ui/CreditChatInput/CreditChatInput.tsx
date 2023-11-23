import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useState } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { PopularQueryCard } from 'features/CreditChat/ui/PopularQueryCard/PopularQueryCard';
import SalutIcon from 'shared/assets/icons/salut-icon.svg';
import SendIcon from 'shared/assets/icons/send-icon.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import classes from './CreditChatInput.module.scss';

interface CreditChatInputProps {
    className?: string;
    value: string;
    setValue: (value: string) => void;
    setFocus: (flag: boolean) => void;
    handleMessageSend: () => void;
    handleQueryCardClick: (value: string) => void;
}

export const CreditChatInput = memo((props: CreditChatInputProps) => {
    const { className, setValue, value, setFocus, handleMessageSend, handleQueryCardClick } = props;

    const preventFormDefault = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleMessageSend();
        },
        [handleMessageSend],
    );

    return (
        <HStack
            maxW
            gap="16"
            justify="center"
            className={classNames(classes.CreditChatInput, {}, [className])}
        >
            <Icon Svg={SalutIcon} />

            <VStack maxW>
                <form style={{ width: '100%' }} onSubmit={preventFormDefault}>
                    <HStack maxW gap="8" className={classes.inputWrapper}>
                        <input
                            onFocus={() => setFocus(true)}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="С чем Вам помочь?"
                            className={classes.input}
                        />
                        <Button variant="clear" type="submit">
                            <Icon Svg={SendIcon} />
                        </Button>
                    </HStack>
                </form>

                <HStack className={classes.popularQueryCardWrapper} justify="between" gap="16">
                    <PopularQueryCard onClick={handleQueryCardClick} title="привет мир!" />
                    <PopularQueryCard onClick={handleQueryCardClick} title="привет мир!" />
                    <PopularQueryCard onClick={handleQueryCardClick} title="привет мир!" />
                    <PopularQueryCard onClick={handleQueryCardClick} title="привет мир!" />
                </HStack>
            </VStack>
        </HStack>
    );
});

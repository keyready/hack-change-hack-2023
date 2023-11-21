import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import { fetchMails } from '../api/fetchMails';
import classes from './MailInput.module.scss';

interface MailInputProps {
    className?: string;
    value: string;
    setValue: (value: string) => void;
    svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const MailInput = memo((props: MailInputProps) => {
    const { className, svg, setValue, value } = props;

    const [items, setItems] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [wasFocused, setWasFocused] = useState<boolean>(false);

    const mails = useMemo(() => 'mail.ru yandex.ru list.ru inbox.ru gmail.com'.split(' '), []);

    const search = useCallback(
        async (event: AutoCompleteCompleteEvent) => {
            const value = event.query;
            if (value.includes('@')) {
                const suggestions = await fetchMails(value);
                setItems(suggestions.map((mail: string) => `${value.split('@')[0]}@${mail}`));
                return;
            }
            setItems(mails.map((mail) => `${value}@${mail}`));
        },
        [mails],
    );

    return (
        <HStack
            maxW
            className={classNames(
                classes.MailInput,
                {
                    [classes.focusedWrapper]: isFocused,
                    [classes.wrong]: !value.includes('@') && !isFocused && wasFocused,
                },
                [className],
            )}
        >
            {svg && <Icon className={classes.icon} Svg={svg} />}
            <AutoComplete
                placeholder="Введите почту"
                onFocus={() => {
                    setIsFocused(true);
                    setWasFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                className={classes.input}
                value={value}
                suggestions={items}
                completeMethod={search}
                onChange={(e) => setValue(e.value)}
            />
        </HStack>
    );
});

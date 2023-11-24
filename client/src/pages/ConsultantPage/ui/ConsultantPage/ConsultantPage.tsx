import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect, useMemo } from 'react';
import { Disclosure } from 'shared/UI/Disclosure';
import { HStack, VStack } from 'shared/UI/Stack';
import { UserChat } from 'features/UserChat';
import { UserRowCard } from 'entities/User';
import classes from './ConsultantPage.module.scss';

interface ConsultantPageProps {
    className?: string;
}

const ConsultantPage = memo((props: ConsultantPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Новые заявки';
    }, []);

    const titles = useMemo(
        () => ['Новые заявки', 'Активные заявки', 'Одобренные заявки', 'Отклоненные заявки'],
        [],
    );
    const contents = useMemo(
        () => [
            <>
                <UserRowCard />
                <UserRowCard isNewMessages />
                <UserRowCard isSelected />
                <UserRowCard />
            </>,
            <div>Активные заявки</div>,
            <div>Одобренные заявки</div>,
            <div>Отклоненные заявки</div>,
        ],
        [],
    );

    const isNewRequests = useMemo(() => [true, false, true, true], []);

    return (
        <Page className={classNames(classes.ConsultantPage, {}, [className])}>
            <HStack maxW gap="32" align="start">
                <VStack gap="16" className={classes.disclosureWrapper}>
                    {titles.map((title, index) => (
                        <Disclosure
                            isNewRequests={isNewRequests[index]}
                            title={title}
                            content={contents[index]}
                            type={index + 1}
                            defaultOpened={index === 0}
                        />
                    ))}
                </VStack>
                <UserChat className={classes.chat} />
            </HStack>
        </Page>
    );
});

export default ConsultantPage;

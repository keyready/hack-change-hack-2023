import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect, useMemo } from 'react';
import { Disclosure } from 'shared/UI/Disclosure';
import { HStack, VStack } from 'shared/UI/Stack';
import { UserChat } from 'features/UserChat';
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
            <div>Новые заявки</div>,
            <div>Активные заявки</div>,
            <div>Одобренные заявки</div>,
            <div>Отклоненные заявки</div>,
        ],
        [],
    );

    const isNewRequests = useMemo(() => [true, false, true, false], []);

    return (
        <Page className={classNames(classes.ConsultantPage, {}, [className])}>
            <h1>Страница консультанта</h1>

            <HStack maxW gap="32" align="start">
                <VStack maxW gap="16">
                    {titles.map((title, index) => (
                        <Disclosure
                            isNewRequests={isNewRequests[index]}
                            title={title}
                            content={contents[index]}
                            type={index + 1}
                        />
                    ))}
                </VStack>
                <UserChat />
            </HStack>
        </Page>
    );
});

export default ConsultantPage;

import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Disclosure } from 'shared/UI/Disclosure';
import { HStack, VStack } from 'shared/UI/Stack';
import { UserChat } from 'features/UserChat';
import { User, UserRowCard } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { UnderwriterPieChart } from 'entities/Underwriter';
import {
    ConsultantPageActions,
    ConsultantPageReducer,
} from '../../model/slice/ConsultantPageSlice';
import classes from './ConsultantPage.module.scss';
import { useBorrowers } from '../../api/fetchBorrowersApi';
import { getSelectedChat } from '../../model/selectors/getSelectedChat';

interface ConsultantPageProps {
    className?: string;
}

const ConsultantPage = memo((props: ConsultantPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Новые заявки';
    }, []);

    const dispatch = useAppDispatch();

    const { data: borrowers, isLoading: isBorrowersLoading } = useBorrowers();

    const selectedChat = useSelector(getSelectedChat);

    const handleChangeSelectedChat = useCallback(
        (user: Partial<User>) => {
            dispatch(ConsultantPageActions.setSelectedChat(user));
        },
        [dispatch],
    );

    const titles = useMemo(
        () => ['Новые заявки', 'Активные заявки', 'Одобренные заявки', 'Отклоненные заявки'],
        [],
    );
    const contents = useMemo(
        () => [
            <>
                {borrowers
                    ?.filter((borrower) => borrower.creditShortInfo.status === 'ACTIVE_REQUEST')
                    .map((borrower) => (
                        <UserRowCard
                            isSelected={borrower.id === selectedChat?.id}
                            onChangeIsSelected={handleChangeSelectedChat}
                            key={borrower.id}
                            user={borrower}
                        />
                    ))}
            </>,
            <>
                {borrowers
                    ?.filter((borrower) => borrower.creditShortInfo.status === 'NEW_REQUEST')
                    .map((borrower) => (
                        <UserRowCard
                            isSelected={borrower.id === selectedChat?.id}
                            onChangeIsSelected={handleChangeSelectedChat}
                            key={borrower.id}
                            user={borrower}
                        />
                    ))}
            </>,
            <>
                {borrowers
                    ?.filter((borrower) => borrower.creditShortInfo.status === 'ACCEPTED_REQUEST')
                    .map((borrower) => (
                        <UserRowCard
                            isSelected={borrower.id === selectedChat?.id}
                            onChangeIsSelected={handleChangeSelectedChat}
                            key={borrower.id}
                            user={borrower}
                        />
                    ))}
            </>,
            <>
                {borrowers
                    ?.filter((borrower) => borrower.creditShortInfo.status === 'REJECTED_REQUEST')
                    .map((borrower) => (
                        <UserRowCard
                            isSelected={borrower.id === selectedChat?.id}
                            onChangeIsSelected={handleChangeSelectedChat}
                            key={borrower.id}
                            user={borrower}
                        />
                    ))}
            </>,
        ],
        [borrowers, handleChangeSelectedChat, selectedChat?.id],
    );

    const isNewRequests = useMemo(() => [true, false, true, true], []);

    return (
        <DynamicModuleLoader reducers={{ consultantPage: ConsultantPageReducer }}>
            <Page className={classNames(classes.ConsultantPage, {}, [className])}>
                <HStack maxW gap="32" align="start">
                    {/* TODO может быть когда-нибудь сделать диаграмму */}
                    {/* <UnderwriterPieChart /> */}
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
                    <UserChat user={selectedChat} className={classes.chat} />
                </HStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ConsultantPage;

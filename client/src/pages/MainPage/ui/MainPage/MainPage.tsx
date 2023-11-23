import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { VStack } from 'shared/UI/Stack';
import { CreditChat } from 'features/CreditChat';
import { GreenCard } from '../GreenCard/GreenCard';
import { PurpleCard } from '../PurpleCard/PurpleCard';
import { Banner } from '../Banner/Banner';
import { StepsBlock } from '../StepsBlock/StepsBlock';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'СберКредит | Hack&Change 2023';
    }, []);

    return (
        <VStack maxW>
            <CreditChat />
            <Page className={classes.MainPage}>
                <VStack maxW gap="32">
                    <div className={classes.cardsWrapper}>
                        <GreenCard />
                        <PurpleCard />
                    </div>
                    <Banner />
                    <StepsBlock />
                </VStack>
            </Page>
        </VStack>
    );
};

export default MainPage;

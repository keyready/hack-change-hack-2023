import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { VStack } from 'shared/UI/Stack';
import { GreenCard } from '../GreenCard/GreenCard';
import { PurpleCard } from '../PurpleCard/PurpleCard';
import { Banner } from '../Banner/Banner';
import { StepsBlock } from '../StepsBlock/StepsBlock';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    return (
        <Page>
            <VStack maxW gap="32">
                <div className={classes.cardsWrapper}>
                    <GreenCard />
                    <PurpleCard />
                </div>
                <Banner />
                <StepsBlock />
            </VStack>
        </Page>
    );
};

export default MainPage;

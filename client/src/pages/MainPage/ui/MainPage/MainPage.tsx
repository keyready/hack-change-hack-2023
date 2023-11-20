import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { HStack } from 'shared/UI/Stack';
import classes from './MainPage.module.scss';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    return (
        <Page>
            <HStack maxW justify="between" gap="32" align="start" />
        </Page>
    );
};

export default MainPage;

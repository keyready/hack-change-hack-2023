import { Page } from 'widgets/Page/Page';
import { useEffect } from 'react';
import { Text } from 'shared/UI/Text';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    return (
        <Page>
            <Text title="Главная страница" />
        </Page>
    );
};

export default MainPage;

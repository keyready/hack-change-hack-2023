import 'app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'app/App';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { PrimeReactProvider } from 'primereact/api';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать приложение');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <PrimeReactProvider>
                <StoreProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </StoreProvider>
            </PrimeReactProvider>
        </ErrorBoundary>
    </BrowserRouter>,
);

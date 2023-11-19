import { Page } from 'widgets/Page/Page';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { VStack } from 'shared/UI/Stack';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ChatActions } from 'entities/Chat';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const MainPage = () => {
    useEffect(() => {
        document.title = 'Hack&Change 2023';
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roomId, setRoomId] = useState<string>();

    const [socket] = useState<WebSocket>(new WebSocket('ws://localhost:5000'));

    const makeConnection = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            socket.send(
                JSON.stringify({
                    type: 'connection',
                    room: roomId,
                    username,
                    password,
                }),
            );

            dispatch(ChatActions.setUsername(username));
            navigate(`${RoutePath.chat}/${roomId}`);
        },
        [dispatch, navigate, password, roomId, socket, username],
    );

    return (
        <Page>
            <VStack maxW>
                <form onSubmit={makeConnection}>
                    <Input placeholder="Имя пользователя" value={username} onChange={setUsername} />
                    <Input placeholder="Пароль" value={password} onChange={setPassword} />
                    <Input placeholder="ID комнаты" value={roomId} onChange={setRoomId} />
                    <Button type="submit">Войти</Button>
                </form>
            </VStack>
        </Page>
    );
};

export default MainPage;

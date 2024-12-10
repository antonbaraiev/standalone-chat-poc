import {setupAxios} from '@dazn/public-watch-party-join-flow';
import {jwtDecode} from 'jwt-decode';
import {useEffect, useState} from 'react';

type TTokenData = {
    user: string;
    deviceId: string;
};

const getTokenData = (authToken: string): TTokenData | undefined => {
    try {
        return jwtDecode(authToken);
    } catch (e) {
        return undefined;
    }
};

const useAuthToken = (
    authToken: string,
): {
    userUUid: string;
    deviceId: string;
    isAuthTokenValid: boolean;
} => {
    const [userUUid, setUserUUid] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [isAuthTokenValid, setAuthTokenValid] = useState(false);

    useEffect(() => {
        if (!authToken) {
            setAuthTokenValid(false);

            return;
        }

        const tokenData = getTokenData(authToken);

        if (!tokenData) {
            setAuthTokenValid(false);

            return;
        }

        setupAxios(authToken);
        setAuthTokenValid(true);

        if (!userUUid) {
            setUserUUid(tokenData!.user);
            setDeviceId(tokenData!.deviceId);
        }
    }, [authToken, userUUid]);

    return {userUUid, deviceId, isAuthTokenValid};
};

export {useAuthToken};

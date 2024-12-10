type TRoomDataResponse = {
    roomId: string;
    type: string;
    state: string;
    internal: boolean;
};

type TRoomData = {
    roomId: string;
    partyType: string;
    roomState: string;
    isInternal: boolean;
};

export type {TRoomDataResponse, TRoomData};

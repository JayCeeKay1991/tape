import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    useMemo
} from 'react';

import { Howl } from 'howler';

type PlayerContext = {
    // currentMixtape: Howl | null;
    streamIndex: number;
    // playing: boolean;
    currentPlaybackTime: number;
    currentStream: Howl[];
    mixTapeDuration: number;
    // setCurrentMixtape: Dispatch<SetStateAction<Howl | null>>;
    setStreamIndex: Dispatch<SetStateAction<number>>;
    // setPlaying: Dispatch<SetStateAction<boolean>>;
    setCurrentPlaybackTime: Dispatch<SetStateAction<number>>;
    setCurrentStream: Dispatch<SetStateAction<Howl[]>>;
    setMixTapeDuration: Dispatch<SetStateAction<number>>;
};

const initialContext = {
    // currentMixtape: null,
    // playing: false,
    streamIndex: 0,
    currentPlaybackTime: 0,
    currentStream: [],
    mixTapeDuration: 0,
    // setCurrentMixtape: () => null,
    // setPlaying: () => false,
    setStreamIndex: () => 0,
    setCurrentPlaybackTime: () => 0,
    setCurrentStream: () => { },
    setMixTapeDuration: () => 0,
};

const PlayerContext = createContext<PlayerContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
    // player contexts
    const [streamIndex, setStreamIndex] = useState<number>(0);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
    const [currentStream, setCurrentStream] = useState<Howl[]>([]);
    const [mixTapeDuration, setMixTapeDuration] = useState<number>(0);

    return (
        <PlayerContext.Provider
            value={{
                currentStream,
                setCurrentStream,
                streamIndex,
                setStreamIndex,
                mixTapeDuration,
                setMixTapeDuration,
                currentPlaybackTime,
                setCurrentPlaybackTime,
            }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}

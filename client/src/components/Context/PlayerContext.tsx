import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    PropsWithChildren,
    useEffect
} from 'react';

import { Howl } from 'howler';

type PlayerContext = {
    // current stream of mixtapes, rendered by channel
    currentStream: Howl[];
    setCurrentStream: Dispatch<SetStateAction<Howl[]>>;

    // index of current mixtape in stream
    streamIndex: number;
    setStreamIndex: Dispatch<SetStateAction<number>>;

    // current position 
    currentPlaybackTime: number;
    setCurrentPlaybackTime: Dispatch<SetStateAction<number>>;

    // total duration of current mixtape
    mixTapeDuration: number;
    setMixTapeDuration: Dispatch<SetStateAction<number>>;

    // playing or not
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;

    // muted or not
    muted: boolean;
    setMuted: Dispatch<SetStateAction<boolean>>;


};

const initialContext = {
    currentStream: [],
    setCurrentStream: () => { },

    streamIndex: 0,
    setStreamIndex: () => 0,

    currentPlaybackTime: 0,
    setCurrentPlaybackTime: () => 0,

    mixTapeDuration: 0,
    setMixTapeDuration: () => 0,

    playing: false,
    setPlaying: () => { },

    muted: false,
    setMuted: () => {}

};

const PlayerContext = createContext<PlayerContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
    // player contexts
    const [currentStream, setCurrentStream] = useState<Howl[]>([]);
    const [streamIndex, setStreamIndex] = useState<number>(0);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
    const [mixTapeDuration, setMixTapeDuration] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            console.log('cleaning up player context')
            Howler.stop()
            Howler.unload()
        };
    }, [currentStream]);
    
    return (
        <PlayerContext.Provider
            value={{
                currentStream,
                setCurrentStream,
                streamIndex,
                setStreamIndex,
                currentPlaybackTime,
                setCurrentPlaybackTime,
                mixTapeDuration,
                setMixTapeDuration,
                playing,
                setPlaying,
                muted,
                setMuted
            }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}

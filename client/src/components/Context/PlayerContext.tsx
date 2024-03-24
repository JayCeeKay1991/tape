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

    // player visibility
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;

    // player control functions
    play: () => void;
    pause: () => void;
    navigateInStream: (direction: 'forward' | 'backward') => void;

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

    visible: false,
    setVisible: () => {},

    play: () => {},
    pause: () => {},
    navigateInStream: () => {}
};

const PlayerContext = createContext<PlayerContext>(initialContext);

export default function ContextProvider({ children }: PropsWithChildren) {
    // player contexts
    const [currentStream, setCurrentStream] = useState<Howl[]>([]);
    const [streamIndex, setStreamIndex] = useState<number>(0);
    const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);
    const [mixTapeDuration, setMixTapeDuration] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            currentStream.forEach(howl => {
                if (howl.playing()) {
                    howl.stop();
                }
                howl.unload();
            });
        };
    }, [currentStream]);

    // Controls

    const play = () => {
        console.log('play clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;

        const currentHowl = currentStream[streamIndex];
        if (currentHowl.playing()) return;

        currentHowl.play();
    };

    const pause = () => {
        console.log('pause clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;

        const currentHowl = currentStream[streamIndex];
        if (!currentHowl.playing()) return;

        currentHowl.pause();
    };

    const navigateInStream = (direction: 'forward' | 'backward') => {
        // handles navigation in both directions
        if (!currentStream[streamIndex]) return;

        const newIndex = direction === 'forward'
            // wraps if we try to navigate out of bounds, or stays at 0
            ? (streamIndex + 1) % currentStream.length
            : streamIndex === 0 ? 0 : streamIndex - 1;

        if (currentStream[newIndex]) {
            // stops previous howl, plays next one
            setStreamIndex(newIndex);
            currentStream[streamIndex]?.stop();
            currentStream[newIndex]?.play();
        }
    };





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
                visible,
                setVisible,
                play,
                pause,
                navigateInStream
            }}>
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayerContext() {
    return useContext(PlayerContext);
}

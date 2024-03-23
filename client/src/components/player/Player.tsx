
import { useState, useRef, useEffect } from 'react';
import { useMainContext } from '../Context/Context';
// helpers
import { formatTime } from '@/utils/playerHelpers';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './Player.css';


const Player = () => {
    const {
        activeHowls,
        streamIndex,
        setStreamIndex,
        playing,
        setPlaying,
        currentPlaybackTime,
        setCurrentPlaybackTime,
        mixTapeDuration,
    } = useMainContext()

    // states
    const [muted, setMuted] = useState<boolean>(false);
    const [currentMixtape, setCurrentMixtape] = useState<Howl | null>(null)
    // refs
    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // player re-renders when the stream index or active howls changes aka mixtape or channel switched
        setCurrentMixtape(activeHowls[streamIndex])
    }, [streamIndex, activeHowls]);

    // PLAYER CONTROLS
    const handlePlayClick = () => {
        if (!currentMixtape || currentMixtape.playing()) {
            return
        }
        currentMixtape.play();
        setPlaying(true);
    };

    const handlePauseClick = () => {
        if (!currentMixtape || !currentMixtape.playing()) {
            return
        }
        currentMixtape.pause();
        setPlaying(false);
    };

    const handleClickNavigation = (newIndex: number) => {
        if (!currentMixtape || !newIndex) {
            return
        }
        setStreamIndex(newIndex);
        setCurrentMixtape(activeHowls[newIndex])
        currentMixtape.play();
        setPlaying(true);
    };

    const handleNextClick = () => {
        if (!currentMixtape) {
            return
        }
        currentMixtape.stop();
        // if the stream is not at the end, increment it
        if (streamIndex < activeHowls.length - 1) {
            const newIndex = streamIndex + 1;
            handleClickNavigation(newIndex);
            // else start from the beginning
        } else {
            const newIndex = 0;
            handleClickNavigation(newIndex);
        }
    };

    const handlePreviousClick = () => {
        if (!currentMixtape) {
            return
        }
        currentMixtape.stop();
        //if streamIndex is greater or equal than 1, decrement it
        if (streamIndex >= 1) {
            const newIndex = streamIndex - 1;
            handleClickNavigation(newIndex);
            // else go to the end
        } else {
            const newIndex = activeHowls.length - 1;
            handleClickNavigation(newIndex);
        }
    };

    const handleToggleMute = () => {
        if (!currentMixtape) {
            return
        }
        if (muted === true) {
            currentMixtape.volume(1);
            setMuted(false);
        } else {
            currentMixtape.volume(0);
            setMuted(true);
        }
    };

    // PROGRESS BAR FUNCTIONS
    const handleChange = () => {
        if (!currentMixtape) {
            return
        }
        setCurrentPlaybackTime(currentMixtape.seek())
        updateRangeValue();
    }

    // Updates the value of the bar, so that it tracks the played time
    const updateRangeValue = () => {
        const percentage = (currentPlaybackTime / mixTapeDuration) * 100;
        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty(
                '--range-value',
                percentage + '%'
            );
        }
    };

    return (
        <div
            id="player"
            className="w-full h-[100px] flex flex-col fixed bottom-0 flex-row justify-center items-center bg-tapeBlack"
        >
            <div
                id="progress-bar"
                className="w-full flex flex-row justify-center items-center "
            >
                <div id="btn-playPause">
                    {playing ? (
                        <button
                            type="button"
                            className="text-tapeWhite me-5"
                            onClick={handlePauseClick}
                        >
                            <IoMdPause size="25" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-tapeWhite me-5 border-none "
                            onClick={handlePlayClick}
                        >
                            <IoMdPlay size="25" />
                        </button>
                    )}
                </div>
                <input
                    type="range"
                    id="seek-slider"
                    ref={progressBarRef}
                    value={currentPlaybackTime}
                    defaultValue="0"
                    max={mixTapeDuration.toString()}
                    onChange={handleChange}
                    className="me-2"
                />
                <span
                    id="duration"
                    ref={totalDurationRef}
                    className="text-tapeWhite me-5"
                >{formatTime(mixTapeDuration)}</span>
                <div id="fastforward-rewind" className=" flex flex-row ">
                    <button
                        type="button"
                        onClick={handlePreviousClick}
                        className="text-tapeWhite me-2 border-none"
                    >
                        <MdSkipPrevious size="35" />
                    </button>
                    <button
                        type="button"
                        onClick={handleNextClick}
                        className="text-tapeWhite me-2 border-none"
                    >
                        <MdSkipNext size="35" />
                    </button>
                    {muted ? (
                        <button
                            type="button"
                            onClick={handleToggleMute}
                            className="text-tapeWhite me-2 border-none"
                        >
                            <BiSolidVolumeMute size="25" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleToggleMute}
                            className=" text-tapeWhite me-2 border-none "
                        >
                            <GoUnmute size="30" />
                        </button>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Player;
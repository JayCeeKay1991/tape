import { useState, useRef } from 'react';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './Player.css';
import { usePlayerContext } from '../Context/PlayerContext';


const Player = () => {
    const { currentStream, playing, setPlaying, streamIndex, setStreamIndex, setCurrentPlaybackTime, mixTapeDuration } = usePlayerContext()
    // states
    const [muted, setMuted] = useState<boolean>(false);
    // refs
    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const play = () => {
        console.log('play clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;

        const currentHowl = currentStream[streamIndex];
        if (currentHowl.playing()) return;

        currentHowl.play();
        setPlaying(true);
    };

    const pause = () => {
        console.log('pause clicked', currentStream[streamIndex]);
        if (!currentStream[streamIndex]) return;

        const currentHowl = currentStream[streamIndex];
        if (!currentHowl.playing()) return;

        currentHowl.pause();
        setPlaying(false);
    };

    const navigateInStream = (direction: 'forward' | 'backward') => {
        // handles navigation in both directions
        if (!currentStream[streamIndex]) return;

        const newIndex = direction === 'forward'
            // wraps if we try to navigate out of bounds, or stays at 0
            ? (streamIndex + 1) % currentStream.length
            : streamIndex === 0 ? 0 : streamIndex - 1;

        if (currentStream[newIndex]) {
            // Update streamIndex state
            setStreamIndex(newIndex);

            // stops previous howl, plays next one
            setStreamIndex(newIndex);
            currentStream[streamIndex]?.stop();
            currentStream[newIndex]?.play();
        }
    };

    // Time Format
    const formatTime = (seconds: number) => {
        return (
            Math.floor(seconds / 60) +
            ':' +
            ('0' + Math.floor(seconds % 60)).slice(-2)
        );
    };

    const toggleMute = () => {
        if (!currentStream[streamIndex]) {
            return;
        }
        if (currentStream[streamIndex].volume() === 0) {
            currentStream[streamIndex].volume(1);
            setMuted(false)
        } else {
            currentStream[streamIndex].volume(0);
            setMuted(true)
        }
    };

    // event for user initiated progress bar change
    const handleProgressBarChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const currentTimeState = parseFloat(event.target.value);
        const currentMixtape = currentStream[streamIndex];
        currentMixtape.seek(currentTimeState);
        setCurrentPlaybackTime(currentTimeState);
        updateRangeValue(currentTimeState, currentStream[streamIndex].duration());

    };

    // Updates the value of the bar, so that it tracks the played time
    const updateRangeValue = (
        currentTimeState: number,
        audioDuration: number
    ) => {
        const percentage = (currentTimeState / audioDuration) * 100;

        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty(
                '--range-value',
                percentage + '%'
            );
        }
    };

    return (
        <>
            <div
                id="player"
                className="w-full h-[100px] flex fixed bottom-0 flex-row justify-center items-center bg-tapeBlack"
            >
                <div
                    id="progress-bar"
                    className="w-11/12 flex flex-row justify-center items-center"
                >
                    <div id="btn-playPause">
                        {playing ? (
                            <button
                                type="button"
                                className="text-tapeWhite me-5"
                                onClick={pause}
                            >
                                <IoMdPause size="25" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="text-tapeWhite me-5 border-none "
                                onClick={play}
                            >
                                <IoMdPlay size="25" />
                            </button>
                        )}
                    </div>
                    <input
                        type="range"
                        id="seek-slider"
                        ref={progressBarRef}
                        defaultValue="0"
                        max={mixTapeDuration.toString()}
                        onChange={handleProgressBarChange}
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
                            onClick={() => navigateInStream('backward')}
                            className="text-tapeWhite me-2 border-none"
                        >
                            <MdSkipPrevious size="35" />
                        </button>
                        <button
                            type="button"
                            onClick={() => navigateInStream('forward')}
                            className="text-tapeWhite me-2 border-none"
                        >
                            <MdSkipNext size="35" />
                        </button>
                        {!muted ? (
                            <button
                                type="button"
                                onClick={toggleMute}
                                className=" text-tapeWhite me-2 border-none "
                            >
                                <GoUnmute size="30" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={toggleMute}
                                className="text-tapeWhite me-2 border-none"
                            >
                                <BiSolidVolumeMute size="25" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Player;
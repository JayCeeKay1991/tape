import { useRef, useEffect, useState } from 'react';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './Player.css';
// context
import { usePlayerContext } from '../Context/PlayerContext';

const Player = () => {
    const {
        currentStream,
        playing,
        setPlaying,
        streamIndex,
        setStreamIndex,
        setCurrentPlaybackTime,
        mixTapeDuration,
        muted,
        setMuted } = usePlayerContext()

    // state
    const [currentMixtape, setCurrentMixtape] = useState<Howl>(null)
    // refs
    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Re-render when current stream changes
        console.log('re rendering player')
        setCurrentPlaybackTime(0)
        updateRangeValue(0)
        if (progressBarRef.current) {
            progressBarRef.current.value = '0';
        }
        if (currentStream[streamIndex]) {
            setCurrentMixtape(currentStream[streamIndex])
            currentMixtape.play()
            setPlaying(true);
        }
    }, [currentStream]);

    useEffect(() => {
        const cleanup = startProgressBarUpdate();
        return cleanup;
    }, [playing, currentStream, streamIndex]);


    const play = () => {
        console.log('play clicked', currentMixtape);
        if (!currentMixtape) return;

        if (currentMixtape.playing()) return;

        currentMixtape.play();
        setPlaying(true);
    };

    const pause = () => {
        console.log('pause clicked', currentMixtape);
        if (!currentMixtape) return;

        if (!currentMixtape.playing()) return;

        currentMixtape.pause();
        setPlaying(false);
    };

    const handleClickNavigation = (newIndex: number) => {
        setStreamIndex(newIndex);
        const newMixtape = currentStream[newIndex];
        setCurrentPlaybackTime(0)
        setCurrentMixtape(newMixtape)
        newMixtape.play();
        updateRangeValue(0)
        setPlaying(true);
    };

    const handleNextClick = () => {
        currentMixtape.stop();

        // Calculate the index for the next track
        const newIndex = (streamIndex + 1) % currentStream.length;

        handleClickNavigation(newIndex);
    };

    const handlePreviousClick = () => {
        currentMixtape.stop();

        // Calculate the index for the previous track
        const newIndex = (streamIndex - 1 + currentStream.length) % currentStream.length;

        handleClickNavigation(newIndex);
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
        if (!currentMixtape) {
            return;
        }
        if (currentMixtape.volume() === 0) {
            currentMixtape.volume(1);
            setMuted(false)
        } else {
            currentMixtape.volume(0);
            setMuted(true)
        }
    };

    // update bar as music plays
    const startProgressBarUpdate = () => {
        const timerId = setInterval(() => {
            if (playing && currentStream.length > 0) {
                const currentTime = currentMixtape.seek();
                if (progressBarRef.current) {
                    progressBarRef.current.value = String(currentTime);
                    updateRangeValue(currentTime);
                }
            }
        }, 1000);

        return () => clearInterval(timerId);
    };


    // event for user initiated progress bar change
    const handleProgressBarChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const currentTimeState = parseFloat(event.target.value);
        currentMixtape.seek(currentTimeState);
        setCurrentPlaybackTime(currentTimeState);
        updateRangeValue(currentTimeState);

    };

    // Updates the value of the bar, so that it tracks the played time
    const updateRangeValue = (
        currentTimeState: number
    ) => {
        const percentage = (currentTimeState / mixTapeDuration) * 100;

        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty(
                '--range-value',
                percentage + '%'
            );
        }
    };

    if (currentStream.length === 0) {
        return null; // Render nothing if currentStream is empty
    }

    return (
        <>
            {currentStream.length === 0 || !currentStream[streamIndex] ? (
                <></>) : (
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
                                onClick={handleNextClick}
                                className="text-tapeWhite me-2 border-none"
                            >
                                <MdSkipPrevious size="35" />
                            </button>
                            <button
                                type="button"
                                onClick={handlePreviousClick}
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
            )}

        </>

    );
};

export default Player;
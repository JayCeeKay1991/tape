import { useState, useRef, useEffect, ChangeEvent } from 'react';
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
import { usePlayerContext } from '../Context/PlayerContext';


const Player = () => {
    const {
        currentStream,
        streamIndex,
        setStreamIndex,
        currentPlaybackTime,
        setCurrentPlaybackTime,
        mixTapeDuration,
    } = usePlayerContext();

    const [playing, setPlaying] = useState<boolean>(false);
    const [muted, setMuted] = useState<boolean>(false);
    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);


    const handlePlayClick = () => {
        console.log('playc clicked', currentStream[streamIndex])
        if (!currentStream[streamIndex] || currentStream[streamIndex].playing()) {
            return;
        }
        currentStream[streamIndex].play();
        setPlaying(true);
    };

    const handlePauseClick = () => {
        if (!currentStream[streamIndex] || !currentStream[streamIndex].playing()) {
            return;
        }
        currentStream[streamIndex].pause();
        setPlaying(false);
    };

    const handleClickNavigation = (newIndex: number) => {
        if (!currentStream[newIndex]) {
            return;
        }
        setStreamIndex(newIndex);
        currentStream[newIndex].play();
        setPlaying(true);
    };

    const handleNextClick = () => {
        if (!currentStream[streamIndex]) {
            return;
        }
        currentStream[streamIndex].stop();
        const newIndex = (streamIndex < currentStream.length - 1) ? streamIndex + 1 : 0;
        handleClickNavigation(newIndex);
    };

    const handlePreviousClick = () => {
        if (!currentStream[streamIndex]) {
            return;
        }
        currentStream[streamIndex].stop();
        const newIndex = (streamIndex >= 1) ? streamIndex - 1 : currentStream.length - 1;
        handleClickNavigation(newIndex);
    };

    const handleToggleMute = () => {
        if (!currentStream[streamIndex]) {
            return;
        }
        const currentAudio = currentStream[streamIndex];
        if (muted) {
            currentAudio.volume(1);
        } else {
            currentAudio.volume(0);
        }
        setMuted(!muted);
    };

    const handleProgressBarChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const currentTimeState = parseFloat(event.target.value);
        currentStream[streamIndex].seek(currentTimeState);
        setCurrentPlaybackTime(currentTimeState);
        updateRangeValue(currentTimeState, mixTapeDuration);
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
                    max={mixTapeDuration.toString()}
                    onChange={handleProgressBarChange}
                    className="me-2"
                />
                <span id="duration" ref={totalDurationRef} className="text-tapeWhite me-5">
                    {currentStream && currentStream[streamIndex] ? formatTime(currentStream[streamIndex].duration()) : '0:00'}
                </span>
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

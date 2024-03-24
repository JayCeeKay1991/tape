import { useRef } from 'react';
import { formatTime } from '@/utils/playerHelpers';
import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './Player.css';
import { usePlayerContext } from '../Context/PlayerContext';

const Player = () => {
    const {
        currentStream,
        streamIndex,
        currentPlaybackTime,
        setCurrentPlaybackTime,
        mixTapeDuration,
        visible,
        play,
        pause,
        navigateInStream,
        toggleMute
    } = usePlayerContext();

    const totalDurationRef = useRef<HTMLParagraphElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    const handleProgressBarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentTimeState = parseFloat(event.target.value);
        currentStream[streamIndex].seek(currentTimeState);
        setCurrentPlaybackTime(currentTimeState);
        updateRangeValue(currentTimeState, mixTapeDuration);
    };

    const updateRangeValue = (currentTimeState: number, audioDuration: number) => {
        const percentage = (currentTimeState / audioDuration) * 100;
        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty('--range-value', percentage + '%');
        }
    };

    return (
        <div id="player" className="w-full h-[100px] flex flex-col fixed bottom-0 flex-row justify-center items-center bg-tapeBlack">
            <div id="progress-bar" className="w-full flex flex-row justify-center items-center ">
                <div id="btn-playPause">
                    {currentStream[streamIndex]?.playing() ? (
                        <button type="button" className="text-tapeWhite me-5" onClick={pause}>
                            <IoMdPause size="25" />
                        </button>
                    ) : (
                        <button type="button" className="text-tapeWhite me-5 border-none " onClick={play}>
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
                    <button type="button" onClick={() => navigateInStream('backward')} className="text-tapeWhite me-2 border-none">
                        <MdSkipPrevious size="35" />
                    </button>
                    <button type="button" onClick={() => navigateInStream('forward')} className="text-tapeWhite me-2 border-none">
                        <MdSkipNext size="35" />
                    </button>
                    <button type="button" onClick={toggleMute} className="text-tapeWhite me-2 border-none">
                        {currentStream[streamIndex]?.volume() === 0 ? (
                            <BiSolidVolumeMute size="25" />
                        ) : (
                            <GoUnmute size="30" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Player;

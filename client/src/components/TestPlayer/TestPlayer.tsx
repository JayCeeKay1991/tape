import { useState, useRef } from 'react';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './TestPlayer.css';
import { useMainContext } from '../Context/Context';
import { updateProgressBar } from '@/utils/playerHelpers';


const TestPlayer = () => {
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


  const handlePlayClick = () => {
    if (!currentMixtape) {
      return
    }
    currentMixtape.play();
    setPlaying(true);
  };

  const handlePauseClick = () => {
    if (!currentMixtape) {
      return
    }
    currentMixtape.pause();
    setPlaying(false);
  };

  // Handle click Navigation parent function for next and previous
  const handleClickNavigation = (newIndex: number) => {
    if (!currentMixtape) {
      return
    }
    setStreamIndex(newIndex);
    const newMixtape = activeHowls[newIndex];
    newMixtape.play();
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

  // Mute function
  const handleToggleMute = () => {
    const currentMixtape = activeHowls[streamIndex];
    if (muted === true) {
      currentMixtape.volume(1);
      setMuted(false);
    } else {
      currentMixtape.volume(0);
      setMuted(true);
    }
  };

  const updateProgressBar = () => {
    if (!currentMixtape) {
      return
    }
    const currentTime = currentMixtape.seek()
    if (progressBarRef.current) {
      progressBarRef.current.value = String(currentTime);
      setCurrentPlaybackTime(currentTime)
      updateRangeValue();
    }
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
    <>
      <div
        id="player"
        className="w-full h-[100px] flex flex-col fixed bottom-0 flex-row justify-center items-center bg-tapeBlack"
      >
        <div
          id="progress-bar"
          className="w-full flex flex-row justify-center items-center "
        >
          <div id="btn-playPause">
            {/* if playing false, render play button, else render pause button */}
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
          <span
            id="current-time"
            ref={durationRef}
            className="text-tapeWhite hidden"
          ></span>

          <input
            type="range"
            id="seek-slider"
            ref={progressBarRef}
            defaultValue="0"
            max={mixTapeDuration.toString()}
            onChange={handleSkipBar}
            className="me-2"
          />
          <span
            id="duration"
            ref={totalDurationRef}
            className="text-tapeWhite me-5"
          ></span>
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
    </>

  );
};

export default TestPlayer;

import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
// styling
import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';
import { BiSolidVolumeMute } from 'react-icons/bi';
import { GoUnmute } from 'react-icons/go';
import './TestPlayer.css';
import { useMainContext } from '../Context/Context';


const TestPlayer = () => {
  const { currentStreamUrls, playing, setPlaying, streamIndex, setStreamIndex, setCurrentPlaybackTime} = useMainContext()
  // states
  const [stream, setStream] = useState<Howl[]>([]); // current stream, array of howls created in useeffect
  const [muted, setMuted] = useState<boolean>(false); // flag for if player is muted
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // refs
  const durationRef = useRef<HTMLParagraphElement>(null); // ref to duration p element that will change
  const totalDurationRef = useRef<HTMLParagraphElement>(null); // ref to duration p that will show mixtapes total length
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    stream.forEach(howl => howl.unload());

    const generatedStream = generateStream(currentStreamUrls);
    setStream(generatedStream);

    if (stream[streamIndex]) {
      stream[streamIndex].play();
      setPlaying(true); // Ensure global playing state is set to true
    }

  }, [currentStreamUrls]);



  useEffect(() => {
    // Play the current track whenever streamIndex changes
    if (stream[streamIndex]) {
      stream[streamIndex].play();
      setPlaying(true); // Ensure global playing state is set to true
    }
  }, [streamIndex]);


  // create stream array from mixTapes
  const generateStream = (urls: string[]) => {
    const mixtapes: Howl[] = urls.map((mixtape, index) => {
      // maps through urls and creates new howl obj for each mixtape url
      return new Howl({
        src: [mixtape],
        html5: true,
        onend: function (this: Howl) {
          let nextIndex = index + 1;
          if (nextIndex >= urls.length) {
            nextIndex = 0; // Loop back to the first song
          }
          // Update state to trigger the next song to play
          setStreamIndex(nextIndex);
        },
        onplay: function (this: Howl) {
          // defines callback function that runs onplay, must be function needs explicit this

          if (totalDurationRef.current) {
            // renders total duration in p element
            totalDurationRef.current.textContent = formatTime(
              Math.round(this.duration())
            );

            // setAudioDuration to the duration of the total duration of the mix
            setAudioDuration(Math.round(this.duration()));
          }

          // handles the rendering of the currently elapsed time by updating every second
          const timerId = setInterval(() => {
            if (this.playing()) {
              // seek is property of howl, finds current point
              const currentTime = this.seek();
              // Update the value of the progress bar
              if (progressBarRef.current) {
                progressBarRef.current.value = String(currentTime);
                updateRangeValue(currentTime, this.duration());
              }
              // calculating the duration that has been played
              if (durationRef.current) {
                durationRef.current.textContent = formatTime(
                  Math.round(currentTime)
                );
              }
            }
          }, 1000);
          return () => clearInterval(timerId);
        },
      });
    });
    return mixtapes;
  };


  const handlePlayClick = () => {
    const currentMixtape = stream[streamIndex];
    currentMixtape.play();
    setPlaying(true);
  };

  const handlePauseClick = () => {
    const currentMixtape = stream[streamIndex];
    currentMixtape.pause();
    setPlaying(false);
  };

  // Handle click Navigation parent function for next and previous
  const handleClickNavigation = (newIndex: number) => {
    setStreamIndex(newIndex);
    setCurrentPlaybackTime(0);
    const newMixtape = stream[newIndex];
    newMixtape.play();
    setPlaying(true);
  };

  const handleNextClick = () => {
    const currentMixtape = stream[streamIndex];
    currentMixtape.stop();

    // if the stream is not at the end, increment it
    if (streamIndex < stream.length - 1) {
      const newIndex = streamIndex + 1;
      handleClickNavigation(newIndex);
      // else start from the beginning
    } else {
      const newIndex = 0;
      handleClickNavigation(newIndex);
    }
  };

  const handlePreviousClick = () => {
    const currentMixtape = stream[streamIndex];
    currentMixtape.stop();

    //if streamIndex is greater or equal than 1, decrement it
    if (streamIndex >= 1) {
      const newIndex = streamIndex - 1;
      handleClickNavigation(newIndex);
      // else go to the end
    } else {
      const newIndex = stream.length - 1;
      handleClickNavigation(newIndex);
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

  // Mute function
  const handleToggleMute = () => {
    const currentMixtape = stream[streamIndex];
    if (muted === true) {
      currentMixtape.volume(1);
      setMuted(false);
    } else {
      currentMixtape.volume(0);
      setMuted(true);
    }
  };

  // event for user initiated progress bar change
  const handleProgressBarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentTimeState = parseFloat(event.target.value);
    const currentMixtape = stream[streamIndex];
    currentMixtape.seek(currentTimeState);
    setCurrentPlaybackTime(currentTimeState);
    updateRangeValue(currentTimeState, audioDuration);

    if (durationRef.current) {
      durationRef.current.textContent = formatTime(
        Math.round(currentTimeState)
      );
    }
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
        className="w-full h-[100px] flex flex-col fixed bottom-0 flex-row justify-center items-center"
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
            max={audioDuration.toString()}
            onChange={handleProgressBarChange}
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

import { MouseEvent, useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

const testUrl1 = 'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3'
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`

import { IoMdPlay } from 'react-icons/io';
import { IoMdPause } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';
import { MdSkipPrevious } from 'react-icons/md';


/* So actually the main error I'm getting with this is that the html5 audiopool is exhausted, and just found a stack overflow thread that talks
about this error with Howler and suggested the solution is to do it using the native html audio tag, so could maybe try that unless someone else finds a solution */


/* So actually the main error I'm getting with this is that the html5 audiopool is exhausted, and just found a stack overflow thread that talks
about this error with Howler and suggested the solution is to do it using the native html audio tag, so could maybe try that unless someone else finds a solution */


// Define the component
const TestPlayer = () => {
  const channelMixtapes = [testUrl1, testUrl2]; // urls of audio files
  const [stream, setStream] = useState<Howl[]>([]); // current stream, array of howls created in useeffect
  const [streamIndex, setStreamIndex] = useState<number>(0); // stores the index of current mixTape in stream
  const [muted, setMuted] = useState<boolean>(false); // flag for if player is muted
  const durationRef = useRef<HTMLParagraphElement>(null); // ref to duration p element that will change
  const totalDurationRef = useRef<HTMLParagraphElement>(null); // ref to duration p that will show mixtapes total length

  // not sure if i need this
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const [playing, setPlaying] = useState(false);

  // lets see if we need this
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
        // maps through urls and creates new howl obj for each mixtape url
        return new Howl({
          src: [mixtape],
          html5: true, // html 5 is better for large files
          onplay: function (this: Howl) {
            // defines callback function that runs onplay, must be function needs explicit this

            if (totalDurationRef.current) {
              // renders total duration in p element
              totalDurationRef.current.textContent = formatTime(
                Math.round(this.duration())
              );
              // Update the total audio duration state when the audio is loaded
              setAudioDuration(Math.round(this.duration()));
            }

            // handles the rendering of the currently elapsed time by updating every second
            const timerId = setInterval(() => {
              if (this.playing()) {
                const currentTime = this.seek();

                // Update the value of the progress bar
                if (progressBarRef.current) {
                  progressBarRef.current.value = String(currentTime);
                }

                // seek is property of howl, finds current point
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

    const generatedStream = generateStream();
    // set the state to the stream produced by above function
    setStream(generatedStream);
  }, []);

  // handle click event for play,pause and stop

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    const currentMixtape = stream[streamIndex];

    if (action === 'play' && !currentMixtape.playing()) {
      currentMixtape.play();
      setPlaying(true);
    } else if (action === 'pause' && currentMixtape.playing()) {
      currentMixtape.pause();
      setPlaying(false);
    } else if (action === 'stop' && currentMixtape.playing()) {
      currentMixtape.stop();
    }
  };

  // Handle click Navigation parent function for next and previous
  const handleClickNavigation = (newIndex: number) => {
    setStreamIndex(newIndex);
    const newMixtape = stream[newIndex];
    newMixtape.play();
    setPlaying(true);
  };

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
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

  const handlePreviousClick = (event: MouseEvent<HTMLButtonElement>) => {
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

  // super simple time formatting util function
  const formatTime = (seconds: number) => {
    return (
      Math.floor(seconds / 60) +
      ':' +
      ('0' + Math.floor(seconds % 60)).slice(-2)
    );
  };

  const handleToggleMute = (event: MouseEvent<HTMLButtonElement>) => {
    const currentMixtape = stream[streamIndex];
    if (muted === true) {
      currentMixtape.volume(1);
      setMuted(false);
    } else {
      currentMixtape.volume(0);
      setMuted(true);
    }
  };

  const handleProgressBarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentTimeState = parseFloat(event.target.value);
    const currentMixtape = stream[streamIndex];
    currentMixtape.seek(currentTimeState);

    // Update the current time displayed
    if (durationRef.current) {
      durationRef.current.textContent = formatTime(
        Math.round(currentTimeState)
      );
    }
  };

  return (
    <div id="player" className="w-full flex flex-row justify-center">
      <div
        id="progress-bar"
        className="w-2/3 flex flex-row justify-center items-center"
      >
        <div id="btn-playPause">
          {/* if playing false, render play button, else render pause button */}
          {playing ? (
            <button
              type="button"
              onClick={(e) => handleClick(e, 'pause')}
              className="text-tapeWhite me-5"
              id="play-icon"
            >
              <IoMdPause />
            </button>
          ) : (
            <button
              type="button"
              className="text-tapeWhite me-5"
              onClick={(e) => handleClick(e, 'play')}
            >
              <IoMdPlay />
            </button>
          )}
        </div>
        {/* <span
          id="current-time"
          ref={durationRef}
          className="text-tapeWhite"
        ></span> */}

        <input
          type="range"
          id="seek-slider"
          ref={progressBarRef}
          defaultValue="0"
          max={audioDuration.toString()}
          onChange={handleProgressBarChange}
          className="w-[697px] me-5 border-tapePink text-tapePink"
        />
        <span
          id="duration"
          ref={totalDurationRef}
          className="text-tapeWhite me-5"
        ></span>
        <div id="player-controls">
          <button
            type="button"
            onClick={handlePreviousClick}
            className="text-tapeWhite me-2"
          >
            <MdSkipPrevious />
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="text-tapeWhite"
          >
            <MdSkipNext />
          </button>
        </div>
        <div className="volume-controls">
          <button type="button" onClick={handleToggleMute}>
            Mute
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPlayer;

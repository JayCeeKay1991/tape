import { MouseEvent, useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import { Buttons } from '@testing-library/user-event/dist/types/system/pointer/buttons';

/* So actually the main error I'm getting with this is that the html5 audiopool is exhausted, and just found a stack overflow thread that talks
about this error with Howler and suggested the solution is to do it using the native html audio tag, so could maybe try that unless someone else finds a solution */

const testUrl1 =
  'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3';
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`;

// Define the component
const TestPlayer = () => {
  const channelMixtapes = [testUrl1, testUrl2]; // urls of audio files
  const [stream, setStream] = useState<Howl[]>([]); // current stream, array of howls created in useeffect
  const [streamIndex, setStreamIndex] = useState<number>(0); // stores the index of current mixTape in stream
  const [muted, setMuted] = useState<boolean>(false); // flag for if player is muted
  const durationRef = useRef<HTMLParagraphElement>(null); // ref to duration p element that will change
  const totalDurationRef = useRef<HTMLParagraphElement>(null); // ref to duration p that will show mixtapes total length

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
            }

            // handles the rendering of the currently elapsed time by updating every second
            const timerId = setInterval(() => {
              if (this.playing()) {
                const currentTime = this.seek();
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
    } else if (action === 'pause' && currentMixtape.playing()) {
      currentMixtape.pause();
    } else if (action === 'stop' && currentMixtape.playing()) {
      currentMixtape.stop();
    }
  };

  // Handle click Navigation parent function for next and previous
  const handleClickNavigation = (newIndex: number) => {
    setStreamIndex(newIndex);
    const newMixtape = stream[newIndex];
    newMixtape.play();
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

  return (
    <div className="player">
      <h1>Channel #1</h1>
      <div className="progress-bar">
        <p ref={durationRef}></p>
        <p ref={totalDurationRef}></p>
      </div>
      <div className="player-controls">
        <button type="button" onClick={(e) => handleClick(e, 'play')}>
          Play
        </button>
        <button type="button" onClick={(e) => handleClick(e, 'pause')}>
          Pause
        </button>
        <button type="button" onClick={(e) => handleClick(e, 'stop')}>
          Stop
        </button>
        <button type="button" onClick={handlePreviousClick}>
          Previous
        </button>
        <button type="button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div className="volume-controls">
        <button type="button" onClick={handleToggleMute}>
          Mute
        </button>
      </div>
    </div>
  );
};

export default TestPlayer;

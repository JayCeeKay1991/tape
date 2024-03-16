import { MouseEvent, useEffect, useState, useRef} from "react";
import { Howl } from "howler";

const testUrl1 = 'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3'
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`


// Define the component
const TestPlayer  = () => {
  const channelMixtapes = [testUrl1, testUrl2];
  const [stream, setStream] = useState<Howl[]>([])
  const [streamIndex, setStreamIndex] = useState<number>(0)
  const durationRef = useRef<HTMLParagraphElement>(null)
  const [duration, setDuration] = useState<number>(0);

  // useEffect (() => {
  //   // create stream array from mixTapes
  //   const generateStream = () => {
  //     const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
  //       return new Howl ({
  //         src: [mixtape],
  //         html5: true,
  //         onplay: function (this: Howl)  {
  //           if (durationRef.current && this.duration()) {
  //             durationRef.current.textContent = formatTime(Math.round(this.duration()));
  //             setDuration(Math.round(this.duration()));
  //           }
  //           const timerId = setInterval(() => {
  //             if (durationRef.current && this.duration()) {                    
  //             durationRef.current.textContent = formatTime(Math.round(this.duration()));
  //             }
  //           }, 1000);
  //           return () => clearInterval(timerId);
            
  //         }
  //     })
  //     })
  //     return mixtapes;
  //   }
  //   const generatedStream = generateStream()
  //   setStream(generatedStream)
  // }, [])

  useEffect(() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
        const sound = new Howl({
          src: [mixtape],
          html5: true,
          onplay: function (this: Howl) {
            const timerId = setInterval(() => {
              if (this.playing()) {
                const currentTime = this.seek();
                if (durationRef.current) {
                  durationRef.current.textContent = formatTime(Math.round(currentTime));
                  setDuration(Math.round(currentTime));
                }
              }
            }, 1000);
            return () => clearInterval(timerId);
          }
        });
        return sound;
      });
      return mixtapes;
    };
    const generatedStream = generateStream();
    setStream(generatedStream);
  }, []);
  

  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('play clicked')
    const currentMixtape = stream[streamIndex];
    if (!currentMixtape.playing()) {
      currentMixtape.play()
    }
  }

  const handlePauseClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('pause clicked')
    const currentMixtape = stream[streamIndex];
    if (currentMixtape.playing()) {
      currentMixtape.pause()
    }
  }

  const handleStopClick = (event: MouseEvent<HTMLButtonElement>) => {
    const currentMixtape = stream[streamIndex];
    console.log('stop clicked')
    if (currentMixtape.playing()) {
      currentMixtape.stop()
    }
  }

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('next clicked');
    const currentMixtape = stream[streamIndex];
    currentMixtape.stop();
    const newIndex = streamIndex + 1;
    setStreamIndex(newIndex);
    const newMixtape = stream[newIndex];
    console.log;(newMixtape)
    newMixtape.play();
  };


  const formatTime = (seconds: number) => {
    return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
  };  
  

  return (
    <div className="player">
      <h1>Channel #1</h1>
      <p ref={durationRef}></p>
      <button type="button" onClick={handlePlayClick}>Play</button>
      <button type="button" onClick={handlePauseClick}>Pause</button>
      <button type="button" onClick={handleStopClick}>Stop</button>
      <button type="button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default TestPlayer;

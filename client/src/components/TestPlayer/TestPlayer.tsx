import { MouseEvent, useEffect, useState } from "react";
import { Howl } from "howler";

const testUrl1 = 'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3'
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`


// Define the component
const TestPlayer  = () => {
  const channelMixtapes = [testUrl1, testUrl2];
  const [currentMixtape, setCurrentMixTape] = useState<Howl | null >(null);
  const [stream, setStream] = useState<Howl[]>([])
  const [streamIndex, setStreamIndex] = useState<number>(0)

  useEffect (() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
        return new Howl ({
          src: [mixtape],
          html5: true,
      })
      })
      return mixtapes;
    }
    const generatedStream = generateStream()
    setStream(generatedStream)
    setCurrentMixTape(generatedStream[0])
  }, [])
  
  console.log(stream)
  
  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('play clicked')
    const currentMixtape = stream[streamIndex];
    console.log(currentMixtape)
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
    const newMixtape = stream[newIndex]; // Use newIndex here
    newMixtape.play();
  };
  

  return (
    <div className="player">
      <h1>Channel #1</h1>
      <button type="button" onClick={handlePlayClick}>Play</button>
      <button type="button" onClick={handlePauseClick}>Pause</button>
      <button type="button" onClick={handleStopClick}>Stop</button>
      <button type="button" onClick={handleNextClick}>Next</button>
    </div>
  );
};

export default TestPlayer;

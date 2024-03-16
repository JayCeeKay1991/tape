import { MouseEvent, useEffect, useState } from "react";
import { Howl } from "howler";

const testUrl1 = 'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3'
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`


// Define the component
const TestPlayer  = () => {
  const channelMixtapes = [testUrl1, testUrl2];
  const [currentMixtape, setCurrentMixTape] = useState<Howl | null >(null);
  const [currentStream, setCurrentStream] = useState<Howl[]>([])

  useEffect (() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
        const mixTape = new Howl ({
          src: [mixtape],
          html5: true,
      })
      return mixTape;
      })
      return mixtapes;
    }
    
    const stream = generateStream()
    setCurrentStream(stream)
    setCurrentMixTape(stream[0])
  })
  
  
  

  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>, mixtape: Howl) => {
    console.log('play clicked')
    console.log(currentMixtape)
    if (!mixTape.playing()) {
      mixTape.play()
    }
  }

  const handlePauseClick = (event: MouseEvent<HTMLButtonElement>, mixtape: Howl) => {
    console.log('pause clicked')
    if (mixTape.playing()) {
      mixTape.pause()
    }
  }

  const handleStopClick = (event: MouseEvent<HTMLButtonElement>, mixtape: Howl) => {
    console.log('stop clicked')
    if (mixTape.playing()) {
      mixTape.stop()
    }
  }

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>, mixtape: Howl) => {
    console.log('next clicked')
    mixTape.stop()
    const newIndex = currentIndex +1;
    console.log(newIndex)
    const newMixtape = stream[newIndex]
    console.log(newMixtape)
    setCurrentMixTape(newMixtape)

    mixTape.play()
  }

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

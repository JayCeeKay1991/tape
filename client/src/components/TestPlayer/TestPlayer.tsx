import { MouseEvent, useState } from "react";
import { Howl } from "howler";

const testUrl1 = 'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3'
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`

// Define the component
const TestPlayer  = () => {
  const [currentMixtape, setCurrentMixTape] = useState(testUrl1)
  const stream = [testUrl1, testUrl2];
  

    const mixTape = new Howl ({
        src: [currentMixtape],
        html5: true,
    })


  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('play clicked')
    console.log(currentMixtape)
    if (!mixTape.playing()) {
      mixTape.play()
    }
  }

  const handlePauseClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('pause clicked')
    if (mixTape.playing()) {
      mixTape.pause()
    }
  }

  const handleStopClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('stop clicked')
    mixTape.stop()
  }

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('next clicked')
    mixTape.stop()
    const currentIndex = stream.indexOf(currentMixtape)
    const newIndex = currentIndex +1;
    console.log(newIndex)
    setCurrentMixTape(stream[newIndex])
    console.log(currentMixtape);
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

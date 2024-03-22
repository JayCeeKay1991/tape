import { useState, useRef, useEffect } from 'react';
import { useWavesurfer } from '@wavesurfer/react'
import { useMainContext } from '../Context/Context';



// A React component that will render wavesurfer
const AudioWave = () => {
  const {currentStreamUrls} = useMainContext();
  const [stream, setStream] = useState<Howl[]>([]);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const { wavesurfer } = useWavesurfer({
    container: progressBarRef,
    height: 90,
    waveColor: 'white',
    progressColor: '#909090',
    barGap: 5,
    barRadius: 10,
    barWidth: 6,
    url: currentStreamUrls[streamIndex],
  })


  useEffect(() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = currentStreamUrls.map((mixtape) => {
        // maps through urls and creates new howl obj for each mixtape url
        return new Howl({
          src: [mixtape],
          html5: true
        });
      });
      return mixtapes;
    };

    const generatedStream = generateStream();
    // set the state to the stream produced by above function
    setStream(generatedStream);
  }, []);


  return (
    <div id="wave" className="w-full h-[100px] absolute top-[250px] left-[300px] z-49" >
      <div
      className='w-[600px] bg-tapePink'
      ref={progressBarRef}>
      </div>
    </div>
  )
}

export default AudioWave;

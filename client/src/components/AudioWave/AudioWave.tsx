import { useState, useRef, useEffect } from 'react';
import { useMainContext } from '../Context/Context';
import WaveSurfer from 'wavesurfer.js';


// A React component that will render wavesurfer
const AudioWave = () => {
  const { currentStreamUrls, streamIndex, playing } = useMainContext();
  const waveContainerRef = useRef<HTMLDivElement | null>(null);
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  // Initialize Wavesurfer
  useEffect(() => {
    if (waveContainerRef.current) {
      const ws = WaveSurfer.create({
        container: waveContainerRef.current,
        height: 110,
        waveColor: 'white',
        progressColor: '#909090',
        barGap: 1,
      });

      setWavesurfer(ws);

      // Cleanup on component unmount
      return () => {
        ws.destroy();
      };
    }
  }, []);

  // Load new track when the index or URLs change
  useEffect(() => {
    if (wavesurfer && currentStreamUrls[streamIndex]) {
      wavesurfer.load(currentStreamUrls[streamIndex]);

      const handleWaveReady = () => {
        if (playing) {
          wavesurfer.play();
        }
      };

      // Play when ready
      wavesurfer.on('ready', handleWaveReady);

      // Cleanup event listener
      return () => {
        wavesurfer.un('ready', handleWaveReady);
      };
    }
  }, [wavesurfer, currentStreamUrls, streamIndex, playing]);

  // Play or pause based on playing state
  useEffect(() => {
    if (wavesurfer) {
      playing ? wavesurfer.play() : wavesurfer.pause();
    }
  }, [playing, wavesurfer]);

  return (
    <div id="wave" className="w-full h-[100px] relative bottom-[100px] left-[300px] z-49" >
      <div
      className='w-[600px]'
      ref={waveContainerRef}>
      </div>
    </div>
  )
}

export default AudioWave;

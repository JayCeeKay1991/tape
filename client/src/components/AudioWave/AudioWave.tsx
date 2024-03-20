import { useMemo, useState, useCallback, useRef } from 'react';
import { useWavesurfer } from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'


const audioUrls = [
  'https://res.cloudinary.com/dkvrbsh2c/video/upload/v1710844740/tfrrnc9hei0kswxkezxi.mp3'
]

const formatTime = (seconds:number) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

// A React component that will render wavesurfer
const AudioWave = () => {
  const containerRef = useRef(null)
  const [urlIndex, setUrlIndex] = useState(0)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 50,
    waveColor: '#FF65AA',
    progressColor: '#909090',
    url: audioUrls[urlIndex],
    barWidth: 2,
    plugins: useMemo(() => [Timeline.create()], []),
  })

  const onUrlChange = useCallback(() => {
    setUrlIndex((index) => (index + 1) % audioUrls.length)
  }, [])

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])


  return (
    <>
      <div ref={containerRef} />

      <p>Current audio: {audioUrls[urlIndex]}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button onClick={onUrlChange}>Change audio</button>

        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
}

export default AudioWave;

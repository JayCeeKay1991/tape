import React, { useState, useRef, useEffect } from 'react';
import { useWavesurfer } from '@wavesurfer/react'



const testUrl1 =
  'https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529539/D.J._Poizen_Visits_Kool_Kyle_Side_A_ncjkhb.mp3';
const testUrl2 = `https://res.cloudinary.com/ddj3xjxrc/video/upload/v1710529445/podcast_mark-mendoza-podcast_1988-mixtape_1000413811719_ts9qep.mp3`;
const testUrl3 = `https://cf-media.sndcdn.com/aCq8wQO1sBZZ.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vYUNxOHdRTzFzQlpaLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzEwOTM2NTk3fX19XX0_&Signature=VmqqSPU8vYMUQILYeHVSJRTWadm0~IJ4bKpr5T5g5sTM5ZYVbZkIv8qRD2jx5Sjsn7WO1EjOAAZDOjc0rbAvW3con~fwEjzuYqYIkQADh-8lwgUzY8Ou4~wEgRR82BrmFqzCWggfRDNeS7VFBr2TERPbH14Phmmdt~PjOB4IfrTIYHfOXT~bg-IGpzJ195x51-Ge5vM4guPk7JCxpYAO0vVpgD1~uSrd25pgv2KocGKLSPtGs9afVKuhZnd4ErPeK3t2d8TRuYQtokSb0sAwcWwSerfWDsJGIXT-P9bKRlOdinjN4uGVNby2W~L~vLFjSh9Hq4XQbqJejagCU-Mxtg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ`;


// A React component that will render wavesurfer
const AudioWave = () => {
  const channelMixtapes = [testUrl1, testUrl2, testUrl3];
  const [stream, setStream] = useState<Howl[]>([]);
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const durationRef = useRef<HTMLParagraphElement>(null);
  const totalDurationRef = useRef<HTMLParagraphElement>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: progressBarRef,
    height: 90,
    waveColor: 'white',
    progressColor: '#909090',
    barGap: 5,
    barRadius: 10,
    barWidth: 6,
    url: channelMixtapes[streamIndex],
  })

  const formatTime = (seconds: number) => {
    return (
      Math.floor(seconds / 60) +
      ':' +
      ('0' + Math.floor(seconds % 60)).slice(-2)
    );
  };

  useEffect(() => {
    // create stream array from mixTapes
    const generateStream = () => {
      const mixtapes: Howl[] = channelMixtapes.map((mixtape) => {
        // maps through urls and creates new howl obj for each mixtape url
        return new Howl({
          src: [mixtape],
          html5: true,
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

    const generatedStream = generateStream();
    // set the state to the stream produced by above function
    setStream(generatedStream);
  }, []);




  const handleProgressBarChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentTimeState = parseFloat(event.target.value);
    const currentMixtape = stream[streamIndex];
    currentMixtape.seek(currentTimeState);

    updateRangeValue(currentTimeState, audioDuration);

    if (durationRef.current) {
      durationRef.current.textContent = formatTime(
        Math.round(currentTimeState)
      );
    }
  };


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
    <div id="wave" className="w-full h-[100px] relative top-[50px]" >
      <div
      className='w-[600px]'
      ref={progressBarRef}
      onChange={handleProgressBarChange}>
      </div>
    </div>
  )
}

export default AudioWave;

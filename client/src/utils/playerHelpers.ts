import { RefObject } from "react";
import { MixTape } from "@/types/Mixtape";
import { useMainContext } from "@/components/Context/Context";
import { ChannelType } from "@/types/Channel";
import { totalDurationRef, progressBarRef } from "@/components/TestPlayer/TestPlayer";

const { currentPlaybackTime, setCurrentPlaybackTime, mixTapeDuration, setMixTapeDuration} = useMainContext()


// main generate streamfunction
export function generateStream (channel: ChannelType) {
  // extract urls
  const urls = extractStreamUrls(channel.mixTapes);
  // generate howls
  return generateHowlsfromUrls(urls)

}

// generate howl instances from urls
export function generateHowlsfromUrls (urls: string[]) {
  // map through urls and return an array of howls
  return urls.map((url) => new Howl({ 
    src: [url], 
    html5: true, 
    preload: true, 
    onplay: [setDuration, updateBar]

  }))
}

// Time Format helper
export function formatTime (seconds: number) {
  return (
    Math.floor(seconds / 60) +
    ':' +
    ('0' + Math.floor(seconds % 60)).slice(-2)
  );
};

// set duration onload
export function setDuration (this: Howl) {
  // sets duration of mixtape in context and renders it in dom
  if (totalDurationRef.current) {
    totalDurationRef.current.textContent = formatTime(Math.round(this.duration()))
    setMixTapeDuration(this.duration());
  }
};

// Update progress bar
export function updateProgressBar(this: Howl) {
  const currentTime = this.seek();
  if (progressBarRef.current) {
    progressBarRef.current.value = String(currentTime);
    setCurrentPlaybackTime(currentTime)
    updateRangeValue();
  }
}

// Custom on play function
export function updateBar (this: Howl) {
  const timerId = setInterval(() => {
    updateProgressBar.call(this); 
  }, 1000);
  return () => clearInterval(timerId);
}

// Updates the value of the bar, so that it tracks the played time
export function updateRangeValue () {
  const percentage = (currentPlaybackTime / mixTapeDuration) * 100;
  if (progressBarRef.current) {
    progressBarRef.current.style.setProperty(
      '--range-value',
      percentage + '%'
    );
  }
};

// extract the urls from the mixtapes and returns as array
export function extractStreamUrls (mixTapes: MixTape[]) {
  const urls = mixTapes.map((tape) => tape.url);
  return urls;
}



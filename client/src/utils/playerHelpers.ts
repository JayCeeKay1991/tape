import { RefObject } from "react";

// generate howl instances from urls
export function generateHowlsfromUrls (urls: string[]) {
  // map through urls and return an array of howls
  return urls.map((url) => new Howl({ src: [url], html5: true, preload: true }))
}

// Time Format helper
export function formatTime (seconds: number) {
  return (
    Math.floor(seconds / 60) +
    ':' +
    ('0' + Math.floor(seconds % 60)).slice(-2)
  );
};

// custom on play function
export function getDuration(this: Howl) {
  return formatTime(Math.round(this.duration()))
};

// Update progress bar
export function updateProgressBar(this: Howl, progressBar: RefObject<HTMLInputElement>) {
  const currentTime = this.seek();
  if (progressBar.current) {
    progressBar.current.value = String(currentTime);
    updateRangeValue(currentTime, this.duration(), progressBar);
  }
}

// Custom on play function
export function onPlay(this: Howl, progressBar: RefObject<HTMLInputElement>) {
  const timerId = setInterval(() => {
    updateProgressBar.call(this, progressBar); // Corrected call
  }, 1000);
  return () => clearInterval(timerId);
}


// Updates the value of the bar, so that it tracks the played time
export function updateRangeValue (currentTimeState: number, audioDuration: number, progressBar: RefObject<HTMLInputElement> ) {
  const percentage = (currentTimeState / audioDuration) * 100;
  if (progressBar.current) {
    progressBar.current.style.setProperty(
      '--range-value',
      percentage + '%'
    );
  }
};


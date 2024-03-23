import { MixTape } from "@/types/Mixtape";
import { useMainContext } from "@/components/Context/Context";
import { Howl } from "howler";
import { ChannelType } from "@/types/Channel";


// main generate streamfunction
export function generateStream(channel: ChannelType) {
    const { setMixTapeDuration, setCurrentPlaybackTime } = useMainContext();
    // extract urls
    const urls = extractStreamUrls(channel.mixTapes);
    // generate howls
    return generateHowlsfromUrls(urls)
}

// generate howl instances from urls
function generateHowlsfromUrls(urls: string[]) {
    // map through urls and return an array of howls
    return urls.map((url) => new Howl({
        src: [url],
        html5: true,
        preload: true,
        onplay: onPlay,
    }))
}

// Custom on play function
function updateBar(this: Howl) {
    const timerId = setInterval(() => {
        setCurrentPlaybackTime(this.seek());
    }, 1000);
    // Cleanup function to clear the interval
    return () => clearInterval(timerId);
}

// custom on play function
function onPlay(this: Howl) {
    setDuration;
    updateBar;
}

// set duration onload
function setDuration(this: Howl) {
    // sets duration of mixtape in context and renders it in dom
   setMixTapeDuration(this.duration());
};

// extract the urls from the mixtapes and returns as array
function extractStreamUrls(mixTapes: MixTape[]) {
    const urls = mixTapes.map((tape) => tape.url);
    return urls;
}

const StreamGenerator = () => {
    const { setMixTapeDuration, setCurrentPlaybackTime } = useMainContext()
return null;

}

export default StreamGenerator;
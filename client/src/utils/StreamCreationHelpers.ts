import { ChannelType } from "@/types/Channel";
import { MixTape } from "@/types/Mixtape";
import { Dispatch, SetStateAction } from "react";

// extract the urls from the mixtapes and returns as array
function extractStreamUrls(mixTapes: MixTape[]) {
    const urls = mixTapes.map((tape) => tape.url);
    return urls;
}

// main generate streamfunction
function generateStream(channel: ChannelType, currentPlaybackTime: number, setCurrentPlaybackTime: Dispatch<SetStateAction<number>>, updateRangeValue) {
    // extract urls
    const urls = extractStreamUrls(channel.mixTapes);
    // generate howls
    return generateHowlsfromUrls(urls, currentPlaybackTime, setCurrentPlaybackTime, updateRangeValue)
}

// generate howl instances from urls
function generateHowlsfromUrls(urls: string[], currentPlaybackTime: number, setCurrentPlaybackTime: Dispatch<SetStateAction<number>>, updateRangeValue) {
    // map through urls and return an array of howls
    return urls.map((url) => new Howl({
        src: [url],
        html5: true,
        preload: true,
        onplay: function (this: Howl) {
            const timerId = setInterval(() => {
                if(this.playing()) {
                    setCurrentPlaybackTime(this.seek());
                    updateRangeValue(currentPlaybackTime, this.duration();
                }
            }, 1000);
            return () => clearInterval(timerId);
        }
    }))
}




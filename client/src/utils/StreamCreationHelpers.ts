import { ChannelType } from "@/types/Channel";
import { MixTape } from "@/types/Mixtape";
import { Dispatch, SetStateAction } from "react";
import { Howl } from "howler";


// main generate streamfunction
export async function generateStream(channel: ChannelType, setCurrentPlaybackTime: Dispatch<SetStateAction<number>>, setMixTapeDuration: Dispatch<SetStateAction<number>>, setStreamIndex: Dispatch<SetStateAction<number>>) {
    // extract urls
    const urls = extractStreamUrls(channel.mixTapes);
    // generate howls and return a promise
    return generateHowlsfromUrls(urls, setCurrentPlaybackTime, setMixTapeDuration, setStreamIndex);
}

// extract the urls from the mixtapes and returns as array
function extractStreamUrls(mixTapes: MixTape[]) {
    const urls = mixTapes.map((tape) => tape.url);
    return urls;
}

// generate howl instances from urls
function generateHowlsfromUrls(
    urls: string[], setCurrentPlaybackTime: Dispatch<SetStateAction<number>>,
     setMixTapeDuration: Dispatch<SetStateAction<number>>, setStreamIndex: Dispatch<SetStateAction<number>>): Promise<Howl[]> {
    // create an array to store promises for each Howl
    const howlPromises: Promise<Howl>[] = [];

    // map through urls and create promises for each Howl
    urls.forEach((url) => {
        const promise = new Promise<Howl>((resolve) => {
            const howl = new Howl({
                src: [url],
                html5: true,
                preload: true,
                onload: function () {
                    // Resolve the promise when the Howl is loaded
                    resolve(howl);
                },
                onplay: function (this: Howl) {
                    console.log(`playing`, this);
                    setMixTapeDuration(Math.round(this.duration()));
                    const timerId = setInterval(() => {
                        if (this.playing()) {
                            setCurrentPlaybackTime(this.seek());
                        }
                    }, 1000);
                    return () => clearInterval(timerId);
                },
                onend: function(this: Howl) {
                    let nextIndex = (index + 1) % urls.length;
                    setStreamIndex(nextIndex);
                }
            });
        });
        howlPromises.push(promise);
    });

    // return a promise that resolves when all Howls are loaded
    return Promise.all(howlPromises);
}




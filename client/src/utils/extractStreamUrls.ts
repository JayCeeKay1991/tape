import { MixTape } from "../types/MixTape";

// extract the urls from the mixtapes and returns as array
export function extractStreamUrls (mixTapes: MixTape[]) {
    const urls = mixTapes.map((tape) => tape.url);
    return urls;
}


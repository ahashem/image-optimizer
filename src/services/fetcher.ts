import fs from "fs";
import fetch from 'node-fetch';
import logger from 'jet-logger';
// import sharp, { Sharp } from 'sharp';
// import { fileTypeFromBuffer } from "file-type";


// eslint-disable-next-line max-len
const TEST_URL = `https://unsplash.com/photos/LZGxmKaadEM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjUwODMwMTc2&force=true`;

class Fetcher {

    private async fetchImage(url: string = TEST_URL) {
        try {
            const response = await fetch(url);
            const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            return fs.createWriteStream('tmp/img.jpg').write(buffer);
        } catch (e) {
            logger.err(e);
        }

        // const fileType = await fileTypeFromBuffer(buffer);
        // if (fileType?.ext) {
        //     const outputFileName = `image-to-process.${fileType.ext}`
        //     return fs.createWriteStream(outputFileName).write(buffer);
        // } else {
        //     logger.info('File type could not be determined! Data may be malformed!');
        // }
    }

    public async get(url:string) {
        return this.fetchImage(url);
    }
}


export default Fetcher

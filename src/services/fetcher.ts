import fetch from 'node-fetch';
import logger from 'jet-logger';
// import sharp, { Sharp } from 'sharp';
import { fromBuffer, FileTypeResult } from "file-type";


// eslint-disable-next-line max-len
const TEST_URL = `https://unsplash.com/photos/LZGxmKaadEM/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjUwODMwMTc2&force=true`;

class Fetcher {

    private async fetchImage(url: string = TEST_URL):Promise<Buffer | string> {
        try {
            const response = await fetch(url);
            const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
            const imgBuffer = Buffer.from(arrayBuffer);
            const fileType: FileTypeResult | undefined = await fromBuffer(imgBuffer);

            // Just information, don't know yet if it is useful
            if (fileType?.ext) {
                    logger.info(`${fileType.ext}`)
                } else {
                    logger.warn('File type could not be determined! Data may be malformed!');
                }
            return imgBuffer;
        } catch (error) {
            logger.err(error);
            if(error) {
                return error.message;
            }
            return 'Unrecognized error'
        }
    }

    public async get(url:string) {
        return this.fetchImage(url);
    }
}


export default Fetcher

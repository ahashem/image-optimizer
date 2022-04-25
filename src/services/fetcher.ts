import fetch from "node-fetch";
import logger from "jet-logger";
import { fromBuffer, FileTypeResult } from "file-type";
import Transformer from "@services/transformer";

/*
    Fetching assets using remote URL into Buffer
 */
class Fetcher {
  private async fetchImage(url: string): Promise<Buffer | string> {
    try {
      const response = await fetch(url);
      const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
      const imgBuffer = Buffer.from(arrayBuffer);
      const fileType: FileTypeResult | undefined = await fromBuffer(imgBuffer);

      // Just information, don't know yet if it is useful
      if (fileType?.ext) {
        logger.info(`${fileType.ext}`);
      } else {
        logger.warn(
          "File type could not be determined! Data may be malformed!"
        );
      }
      return imgBuffer;
    } catch (error) {
      logger.err(error);
      if (error) {
        return error.message;
      }
      return "Unrecognized error";
    }
  }

  public async get(url: string) {
    return this.fetchImage(url);
  }
}

export default Fetcher;

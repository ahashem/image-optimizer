import logger from "jet-logger";
import sharp, { Sharp } from "sharp";

type ReturnType = Promise<Buffer | string> | string;

class Transformer {
  public resize(
    imageBuffer: Buffer,
    targetWidth?: number,
    targetHeight?: number
  ): ReturnType {
    try {
      return sharp(imageBuffer).resize(targetWidth, targetHeight).toBuffer();
    } catch (error) {
      logger.err(error);
      return error.message || "Unrecognized Sharp error";
    }
  }
}

export default Transformer;

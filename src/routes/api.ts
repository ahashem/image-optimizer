import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import Fetcher from "@services/fetcher";
import Transformer from "@services/transformer";

// Export the base-router
const baseRouter = Router();
const { OK, NOT_FOUND } = StatusCodes;

// TODO: provide in service configuration
const DEFAULT_WIDTH = "300";
const DEFAULT_HEIGHT = "300";

interface requestOptions {
  url: string;
  targetWidth?: number;
  targetHeight?: number;
}

const getResizedImage = async (
  fetcher: Fetcher,
  transformer: Transformer,
  options: requestOptions
) => {
  let asset;
  const { url, targetWidth, targetHeight } = options;
  if (targetHeight != undefined || targetWidth != undefined) {
    const buffer = await fetcher.get(url);
    if (Buffer.isBuffer(buffer)) {
      return transformer.resize(buffer, targetWidth, targetHeight);
    }
  } else {
    asset = fetcher.get(url);
  }
  return asset;
};

const performAction = async (req: Request, res: Response) => {
  const { url, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = req.params;
  const fetcher = new Fetcher();
  const transformer = new Transformer();

  if (!url) {
    throw new Error("Missing URL");
  }
  try {
    const targetWidth = parseInt(width, 10);
    const targetHeight = parseInt(height, 10);

    const bufferResponse = await getResizedImage(fetcher, transformer, {
      url,
      targetWidth,
      targetHeight,
    });

    return res.status(OK).end(bufferResponse);
  } catch (error) {
    res.status(NOT_FOUND).end();
    if (error && typeof error === "string") {
      throw new Error(error);
    }
  }
};

// Setup routers
/* eslint-disable @typescript-eslint/no-misused-promises*/

// image resized with specific dimensions => /300x200/https://host/path-to-image.jpg

baseRouter.get("/:width(\\d+)?x:height(\\d+)?/:url(*)", performAction);
// image resized with some default options/config => /https://host/path-to-image.jpg
baseRouter.get("/:url(*)", performAction);

// async rule fixed in Express v5
// https://github.com/expressjs/express/issues/4892#issuecomment-1101366213

// Export default.
export default baseRouter;

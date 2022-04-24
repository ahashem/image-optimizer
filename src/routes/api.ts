import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import Fetcher from '@services/fetcher';


// Export the base-router
const baseRouter = Router();
const { OK, NOT_FOUND } = StatusCodes;

// Setup routers
baseRouter.get('/:url(*)', async (req: Request, res: Response) => {
    const { url } = req.params;
    const fetcher = new Fetcher();
    if (!url) {
        throw new Error('missing URL');
    }
    try {
        const bufferResponse = await fetcher.get(url);
        return res.status(OK).end(bufferResponse);
    } catch (error) {
        res.status(NOT_FOUND).end();
        if(error && typeof error === 'string') {
            throw new Error(error);
        }
    }
});

// Export default.
export default baseRouter;

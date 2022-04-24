import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';
import Fetcher from '@services/fetcher';


// Export the base-router
const baseRouter = Router();
const { OK } = StatusCodes;

// Setup routers
baseRouter.get('/:url(*)', async (req: Request, res: Response) => {
    const { url } = req.params;
    const fetcher = new Fetcher();
    if (!url) {
        throw new Error('missing URL');
    }
    await fetcher.get(url)
    return res.status(OK).end();
});

// Export default.
export default baseRouter;

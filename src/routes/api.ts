import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';


// Export the base-router
const baseRouter = Router();
const { OK } = StatusCodes;

// Setup routers
baseRouter.get("/", (_: Request, res: Response) => {
    return res.status(OK).json({});
});

// Export default.
export default baseRouter;

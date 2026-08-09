import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { ProxyClient } from "../proxy/proxy.js";
import { services } from "../config/services.config.js";
import { api } from "../middleware/scraping.limiter.js";

const apiRouter: Router = Router();
const apiProxy = new ProxyClient(services.manga!);

apiRouter.all('/{*splat}', api, (req: Request, res: Response, next: NextFunction) => {
    apiProxy.proxyWeb(req, res);    
});

export default apiRouter;
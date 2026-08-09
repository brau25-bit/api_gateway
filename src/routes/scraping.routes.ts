import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { ProxyClient } from "../proxy/proxy.js";
import { services } from "../config/services.config.js";
import { search } from "../middleware/scraping.limiter.js";

const mangaRouter: Router = Router();
const scrapingProxy = new ProxyClient(services.scraping!);

mangaRouter.all('/{*splat}', search, (req: Request, res: Response, next: NextFunction) => {
    scrapingProxy.proxyWeb(req, res)
});

export default mangaRouter;
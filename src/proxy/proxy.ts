import httpProxy from 'http-proxy';
import { Request, Response } from 'express';

export class ProxyClient {

    private target: string;
    private proxy = httpProxy.createProxyServer()

    constructor(target: string){
        this.target = target;
    }

    proxyWeb(req: Request, res: Response){
        console.log("method:", req.method);
        console.log("originalUrl:", req.originalUrl);
        console.log("url:", req.url);
        
        this.proxy.web(req, res, {
            target: this.target
        })
    } 
}
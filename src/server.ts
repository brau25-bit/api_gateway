import express, { Express } from "express";
import cors from 'cors'
import 'dotenv/config'

import mangaRouter from "./routes/scraping.routes.js";
import apiRouter from "./routes/manga.routes.js";

const server: Express = express();

server.use(cors());

server.use('/api/v1/manga-library', apiRouter);

server.use('/api/v1/scraping', mangaRouter);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
});
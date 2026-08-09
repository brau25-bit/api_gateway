import 'dotenv/config'

export const services = {
    manga: process.env.MANGA_SERVER,
    scraping: process.env.SCRAPING_SERVER
}
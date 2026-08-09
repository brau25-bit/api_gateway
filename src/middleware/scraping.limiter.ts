import rateLimit from "express-rate-limit";

const search = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: (req) => {
        if(req.path === '/manga/search') return 10;

        if(req.path === '/manga') return 15;

        if(req.path === '/manga/chapter') return 5;

        return 10;
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});

const api = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
})

export { search, api }
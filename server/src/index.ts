import { IncomingMessage, ServerResponse } from "http";
import { Client } from 'pg';
import * as http from 'http';
import {
    handleCountriesRequest,
    handleCurrenciesRequest,
    handleActiveCountryRequest,
    handleActiveCurrencyRequest,
} from './utils';
import 'dotenv/config'

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true
};

export const client = new Client(dbConfig as any);

client.connect((error) => {
    if (error) {
        console.error('Database connection error:', error);
    } else {
        console.log('Database connected successfully');
    }
});

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const params = new URLSearchParams(req.url.slice(req.url.indexOf('?') + 1));
    const id = params.get('id');
    const active = params.get('active') === 'true';

    switch (true) {
        case req.url === '/countries':
            handleCountriesRequest(res);
            break;
        case req.url === '/currencies':
            handleCurrenciesRequest(res);
            break;
        case req.url?.startsWith('/set-active-countries'):
            handleActiveCountryRequest(res, id, active);
            break;
        case req.url?.startsWith('/set-active-currencies'):
            handleActiveCurrencyRequest(res, id, active);
            break;
        default:
            res.writeHead(404);
            res.end('Invalid endpoint');
            break;
    }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




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
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
    // ssl: true
};

export const client = new Client(dbConfig as any);

const query = {
    text: `CREATE TABLE iso4217 (
    country VARCHAR(255),
    currency VARCHAR(255),
    currency_code VARCHAR(255),
    active_country BOOLEAN,
    active_currency BOOLEAN
)`}

client.connect((error) => {
    if (error) {
        console.error(dbConfig)
        console.error('Database connection error:', error);
    } else {
        client.query(query,(error) => {
              if (error) {
                  console.error(error)
              }
          })
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

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




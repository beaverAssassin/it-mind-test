import { ServerResponse } from 'http';
import { client } from './index';
import { QueryConfig } from 'pg';

const getRequiredErrorMessage = (res: ServerResponse, id: string, active: boolean) => {
  if (!id || active === undefined) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'id or active is required' }));
    return;
  }
}

const get500ErrorMessage = (res: ServerResponse) => {

  res.writeHead(500);
  res.end(JSON.stringify({ error: 'Internal Server Error' }));
}

const getSuccessMessage = (res: ServerResponse, id) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.writeHead(200);
  res.end(JSON.stringify({ message: `Flag active for ${id} updated successfully` }));
}

export const handleCountriesRequest = (res: ServerResponse) => {
  client.query('SELECT country, currency_code, active_country FROM iso4217 ORDER BY country ASC, currency_code ASC', (error, results) => {
    if (error) {
      console.error(error)
      get500ErrorMessage(res)
    } else {
      const uniqueCountries = {};
      const result = [];

      results.rows.forEach((item) => {
        if (!uniqueCountries[item.country]) {
          uniqueCountries[item.country] = {
            title: item.country,
            items: [item.currency_code],
            active: item.active_country
          };
          result.push(uniqueCountries[item.country]);
        } else {
          uniqueCountries[item.country].items.push(item.currency_code)
        }
        uniqueCountries[item.country].items.sort();

      });

      res.writeHead(200);
      res.end(JSON.stringify(result));
    }
  });
};

export const handleCurrenciesRequest = (res: ServerResponse) => {
  client.query('SELECT * FROM iso4217 ORDER BY currency_code ASC, country ASC', (error, results) => {
    if (error) {
      get500ErrorMessage(res)
    } else {
      const uniqueCurrencyCodes = {};
      const result = [];

      results.rows.forEach((item) => {
        if (!uniqueCurrencyCodes[item.currency_code]) {
          uniqueCurrencyCodes[item.currency_code] = {
            title: item.currency_code,
            items: [item.country],
            active: item.active_currency
          };
          result.push(uniqueCurrencyCodes[item.currency_code]);
        } else {
          uniqueCurrencyCodes[item.currency_code].items.push(item.country);
        }
      });
      res.writeHead(200);
      res.end(JSON.stringify(result));
    }
  });
};

export const handleActiveCountryRequest = (res: ServerResponse, id: string, active: boolean) => {
  getRequiredErrorMessage(res,id,active)

  const query = {
    text: 'UPDATE iso4217 SET active_country = $1 WHERE country = $2',
    values: [active, id],
  };

  client.query(query as QueryConfig, (error) => {
    if (error) {
      get500ErrorMessage(res)
    } else {
      getSuccessMessage(res, id)
    }
  });
};

export const handleActiveCurrencyRequest = (res: ServerResponse, id: string, active: boolean) => {
  getRequiredErrorMessage(res,id,active)

  const query = {
    text: 'UPDATE iso4217 SET active_currency = $1 WHERE currency_code = $2',
    values: [active, id],
  };

  client.query(query as QueryConfig, (error, results) => {
    if (error) {
      get500ErrorMessage(res)
    } else {
      getSuccessMessage(res, id)
    }
  });
};

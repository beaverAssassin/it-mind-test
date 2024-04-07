import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


type Response = {
  title: string,
  items: string[],
  active: boolean
}

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {
  }

  async getCountries(): Promise<Response[]> {
    const countries = await this.prisma.$queryRaw`
      SELECT
        country,
        ARRAY_AGG(currency_code) as currency_code,
        active_country
      FROM
        iso4217
      GROUP BY
        country, active_country
      ORDER BY
        country ASC
    `;

    console.log(countries)
    // @ts-ignore
    return countries?.map(row => ({
      title: row.country,
      items: row.currency_code,
      active: row.active_country,
    }));
  }

  async getCurrencies(): Promise<Response[]> {
    const currencies = await this.prisma.$queryRaw`
      SELECT
        currency,
        ARRAY_AGG(country) as country,
        active_currency
      FROM
        iso4217
      GROUP BY
        currency, active_currency
      ORDER BY
        currency ASC
    `;

    // @ts-ignore
    return currencies?.map(row => ({
      title: row.currency,
      items: row.country,
      active: row.active_currency,
    }));
  }

  async setActiveCountry(item: string, active: boolean): Promise<void> {
    try {
      await this.prisma.iso4217.update({
        where: { country: item, id: 1 },
        data: { active_country: active },
      });
    } catch (error) {
      throw new NotFoundException('Error updating active country');
    }
  }

  async setActiveCurrency(item: string, active: boolean): Promise<void> {
    try {
      await this.prisma.iso4217.update({
        where: { currency: item, id: 1 },
        data: { active_currency: active },
      });
    } catch (error) {
      throw new NotFoundException('Error updating active currency');
    }
  }


}
